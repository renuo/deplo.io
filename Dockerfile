FROM ruby:3.4-alpine

RUN apk add --no-cache build-base

WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . .
RUN bundle exec jekyll build

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "3000", "--no-watch"]

EXPOSE 3000
