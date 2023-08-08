FROM node:lts-alpine3.18

WORKDIR /app/nest-app

COPY package* .

RUN npm install

COPY . .

RUN mkdir -p uploads/posts/{photos,videos}

EXPOSE 3000