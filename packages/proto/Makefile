PROTOC_INCLUDES := -I$$GOPATH/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis\
	-I$$GOPATH/src/github.com/grpc-ecosystem/grpc-gateway/ \
	-I$$GOPATH/src/github.com/martinxsliu/protoc-gen-graphql/protobuf \
	-I$$GOPATH/src/github.com/chrusty/protoc-gen-jsonschema

PROTOC := protoc
PROTOCBUF := protobuf
# PROTOOPTS := --experimental_allow_proto3_optional

JSONSCHEMAS_OUTPUT := schemas
GRAPHQL_OUTPUT := graphql
SWAGGER_OUTPUT := swagger
TYPESCRIPT_TYPES := types
SERVICES = $(PROTOCBUF)/services.proto
PROTOTYPES = $(PROTOCBUF)/graphs.proto $(PROTOCBUF)/actions.proto
TARGETS = $(SWAGGER_OUTPUT)/*.json $(GRAPHQL_OUTPUT)/*.graphql $(JSONSCHEMAS_OUTPUT)/*.json $(TYPESCRIPT_TYPES)/%.d.ts

all: $(TARGETS)

$(SWAGGER_OUTPUT)/%.json: $(SERVICES)
	mkdir -p $(SWAGGER_OUTPUT)
	$(PROTOC) $(PROTOOPTS) -I$(PROTOCBUF) $(PROTOC_INCLUDES) \
		--swagger_opt allow_delete_body \
		--swagger_out=$(SWAGGER_OUTPUT) $<
	for file in $(SWAGGER_OUTPUT)/*.swagger.json; do \
		mv "$$file" "$(SWAGGER_OUTPUT)/$$(basename "$$file" .swagger.json).json"; \
	done
	
$(GRAPHQL_OUTPUT)/%.graphql:
	mkdir -p $(GRAPHQL_OUTPUT)
	$(PROTOC) $(PROTOOPTS) -I$(PROTOCBUF) $(PROTOC_INCLUDES) \
		--graphql_opt input_mode=service \
		--graphql_opt field_name=preserve \
		--graphql_out=$(GRAPHQL_OUTPUT) $(SERVICES) $(PROTOTYPES) $(PROTOCBUF)/payloads.proto
	for file in $(GRAPHQL_OUTPUT)/*.graphql; do \
		mv "$$file" "$(GRAPHQL_OUTPUT)/$$(basename "$$file" _pb.graphql).graphql"; \
	done
	cat $(GRAPHQL_OUTPUT)/*.graphql > $(GRAPHQL_OUTPUT)/main.graphql

$(JSONSCHEMAS_OUTPUT)/%.json:
	mkdir -p $(JSONSCHEMAS_OUTPUT)
	$(PROTOC) $(PROTOOPTS) -I$(PROTOCBUF) $(PROTOC_INCLUDES) \
		--jsonschema_opt disallow_additional_properties \
		--jsonschema_opt all_fields_required \
		--jsonschema_out=$(JSONSCHEMAS_OUTPUT) \
		$(PROTOTYPES) $(PROTOCBUF)/payloads.proto
	for file in $(JSONSCHEMAS_OUTPUT)/*.jsonschema; do \
		mv "$$file" "$(JSONSCHEMAS_OUTPUT)/$$(basename "$$file" .jsonschema).json"; \
	done
	./scripts/add-schema-id schemas/*.json
	./scripts/patch-schema-fields patches.json $$(pwd)/schemas

$(TYPESCRIPT_TYPES)/%.d.ts:
	mkdir -p $(TYPESCRIPT_TYPES)
	$(PROTOC) $(PROTOOPTS) -I$(PROTOCBUF) $(PROTOC_INCLUDES) \
		--plugin=$$(dirname $$(node -e "console.log(require.resolve('ts-proto/package.json'))"))/protoc-gen-ts_proto \
		--ts_proto_out=. \
		$(PROTOTYPES)
	node_modules/.bin/tsc  \
		--target ES5 \
		--skipLibCheck \
		--outDir . *.ts
	node_modules/.bin/tsc  \
		--skipLibCheck \
		--declaration \
		--emitDeclarationOnly \
		--outDir $(TYPESCRIPT_TYPES) *.ts
	sed -i.bak 's/globalThis/global.globalThis || global/' *.js
	rm *.js.bak

	
prepare: 
	GO111MODULE=on \
		go get -v github.com/grpc-ecosystem/grpc-gateway; \
		go get -v github.com/martinxsliu/protoc-gen-graphql; \
		go get -v github.com/chrusty/protoc-gen-jsonschema/cmd/protoc-gen-jsonschema;

clean:
	rm -rf $(SWAGGER_OUTPUT) $(GRAPHQL_OUTPUT) $(JSONSCHEMAS_OUTPUT) $(TYPESCRIPT_TYPES) *.{js,ts}


.PHONY: prepare $(JSONSCHEMAS_OUTPUT)/%.json 
