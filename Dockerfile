FROM node:alpine

ARG VITE_GOOGLE_TAG_ID

WORKDIR /app
COPY package.json ./
RUN npm install

ENV VITE_GOOGLE_TAG_ID=$VITE_GOOGLE_TAG_ID

COPY . .
RUN npm run build

CMD ["node", "build"]

EXPOSE 3000
