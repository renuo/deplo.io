# Deplo.io

## Environments

| Branch  | Domain                               | Deployment |
| ------- | ------------------------------------ | ---------- |
| develop | https://develop.5666d75.deploio.app/ | auto       |
| main    | https://deplo.io                     | release    |

- [Deplo.io Contact Request Tracker](https://docs.google.com/spreadsheets/d/131rDpYeXOnmWOocurwgg0tjId01k5rn2navTFBl51dQ/edit?gid=0#gid=0)

## Setup

```sh
git clone git@github.com:renuo/deplo.io.git
cd deplo.io
bin/setup
```

## Development

Start the Jekyll development server:

```sh
bin/run
```

Translations live in `_i18n/{de,en,fr,it}.yml` and are rendered with
`jekyll-i18n`. German pages use root URLs; the other locales use a language
prefix. Define pages once in `_data/routes.yml`; the localized variants are
generated during the build.

## Checking

Validate Ruby, translations, and the generated site:

```sh
bin/check
```

## Building

To create a production version of your app:

```sh
bin/build
```

## Copyright

2022-2026 by Nine Internet Solutions AG and Renuo AG – License undecided, assume proprietary
