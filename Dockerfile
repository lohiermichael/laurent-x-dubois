# Use the official Node.js image from the Docker Hub
FROM node:22-alpine AS base
WORKDIR /work/
COPY ./package*.json ./
EXPOSE 3000

FROM base AS production
RUN npm install
COPY . /work/
CMD ["node", "app.js"]

FROM base AS development
RUN npm install -g nodemon && npm install
COPY . /work/
CMD ["sh", "run_dev.sh"]
