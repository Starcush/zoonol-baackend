FROM node:18.17-alpine3.18

ENV TZ Asia/Seoul

WORKDIR /usr/app

COPY . .
RUN yarn install
RUN yarn build

ENV NODE_ENV production

CMD [ "yarn", "start" ]
EXPOSE 8080