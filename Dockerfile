FROM ruby:3.4-alpine

RUN apk add --no-cache build-base nodejs npm

WORKDIR /app
COPY Gemfile Gemfile.lock package.json package-lock.json ./
RUN bundle install && npm ci
COPY . .
RUN bin/build

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "3000", "--no-watch"]

EXPOSE 3000
