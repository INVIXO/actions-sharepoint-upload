FROM node:lts

ADD entrypoint.sh /entrypoint.sh
ADD logic.ts /logic.ts
ADD package.json /package.json
ENTRYPOINT ["/entrypoint.sh"]