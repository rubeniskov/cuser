# FROM node:12.14 AS builder
FROM node:12.14
# WORKDIR /root
# COPY packages ./packages
# COPY package.json lerna.json yarn.lock ./
# RUN yarn install
# RUN cd packages/cli && yarn link
# FROM node:12.14  
# COPY --from=builder /go/src/github.com/alexellis/href-counter/app .
RUN npm install -g @cuser/cli
ENTRYPOINT ["cuser"]  
