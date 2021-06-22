FROM node:16-alpine

COPY package.json yarn.lock .

RUN yarn install --prod

ADD . .

RUN yarn run build

CMD yarn run start
