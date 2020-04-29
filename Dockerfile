FROM node:lts

ADD logic.ts /logic.ts
ADD package.json /package.json

RUN npm install && npx ts-node logic.ts