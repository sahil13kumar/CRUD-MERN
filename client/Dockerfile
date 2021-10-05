FROM node:alpine as crud-app

WORKDIR /client

COPY package*.json README.md ./

RUN npm install

COPY ./public ./public

COPY ./src ./src

ENV REACT_APP_baseAPIURL=http://localhost:5000/

RUN npm run build

FROM nginx:latest

LABEL maintainer=sahil1999

COPY --from=crud-app /client/build/ /usr/share/nginx/html

EXPOSE 80

#CMD npm start
