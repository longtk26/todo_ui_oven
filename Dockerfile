FROM node:alpine3.21

WORKDIR /todo_app

COPY package.json /todo_app

RUN npm install 

COPY . /todo_app

CMD ["sh", "-c", "npm run dev"]