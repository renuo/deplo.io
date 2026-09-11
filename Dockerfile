# Build stage: Ruby for Jekyll, Node for Tailwind.
FROM ruby:3.4-slim AS build

ARG PUBLIC_RECAPTCHA_KEY_ID
ARG RECAPTCHA_SECRET_KEY
ARG VITE_GOOGLE_TAG_ID

ENV PUBLIC_RECAPTCHA_KEY_ID=$PUBLIC_RECAPTCHA_KEY_ID \
    RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY \
    VITE_GOOGLE_TAG_ID=$VITE_GOOGLE_TAG_ID

RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential curl ca-certificates \
  && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y --no-install-recommends nodejs \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle config set --local without development \
  && bundle install --jobs 4 --retry 3

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN bin/build

# Runtime stage: Caddy serving the generated site. No Ruby, no Node.
FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/_site /srv

EXPOSE 8080
