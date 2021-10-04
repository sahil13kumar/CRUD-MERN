FROM node:alpine as crud-app

WORKDIR /client

COPY package*.json README.md ./

RUN npm install

COPY ./public ./public

COPY ./src ./src

ENV REACT_APP_baseAPIURL=http://localhost:5000/

# RUN yarn build

# FROM nginx:latest

# LABEL maintainer=Aamir-Pinger

# COPY --from=todo-app-build /client/build/ /usr/share/nginx/html

EXPOSE 3000

CMD npm start