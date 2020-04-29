FROM node:lts

ADD entrypoint.sh /entrypoint.sh
ADD logic.ts /logic.ts
ADD package.json /package.json

RUN npm install && npx ts-node logic.ts