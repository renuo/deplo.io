FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install

RUN echo "VITE_GOOGLE_TAG_ID=$VITE_GOOGLE_TAG_ID" > .env

COPY . .
RUN npm run build

CMD ["node", "build"]

EXPOSE 3000
