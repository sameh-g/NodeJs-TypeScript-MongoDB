FROM node:latest

RUN mkdir /Nodejs-TypeScript-MongoDB
WORKDIR /Nodejs-TypeScript-MongoDB
COPY package.json /Nodejs-TypeScript-MongoDB/

RUN npm install

CMD [ "npm", "start" ]
