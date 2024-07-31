FROM node:14-alpine as base

WORKDIR /work/
COPY ./package*.json ./
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /work/
CMD ["node", "app.js"]

FROM base as development
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /work/
CMD ["sh", "run_dev.sh"]
