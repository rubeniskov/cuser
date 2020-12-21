FROM node:12.14
ARG VERSION=latest
RUN npm install -g @cuser/cli@$VERSION
ENTRYPOINT ["cuser"]  
