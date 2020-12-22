FROM node:12.14-alpine AS builder
ARG VERSION=latest

RUN apk add --update alpine-sdk
RUN apk add --no-cache make python3 py3-pip
RUN npm config set user 0
RUN npm config set unsafe-perm true
RUN npm install -g @cuser/cli@$VERSION

FROM node:12.14-alpine
COPY --from=builder /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN apk add libc6-compat
RUN ln -s /lib/libc.musl-x86_64.so.1 /lib/ld-linux-x86-64.so.2
ENTRYPOINT ["/usr/local/lib/node_modules/@cuser/cli/index.js"]
