# Deplo.io

## Environments

| Branch  | Domain                                   | Deployment |
|---------|------------------------------------------|------------|
| develop | https://develop.5666d75.deploio.app/     | auto       |
| main    | https://deplo.io                         | release    |

- [Deplo.io Contact Request Tracker](https://docs.google.com/spreadsheets/d/131rDpYeXOnmWOocurwgg0tjId01k5rn2navTFBl51dQ/edit?gid=0#gid=0)

## Setup

```sh
git clone git@github.com:renuo/deplo.io.git
cd deplo.io
bin/setup
```

## Development

Start the development server:

```sh
bin/run dev
```

## Checking

Run the linters and compile Paraglide (translations):

```sh
bin/check
```

## Building

To create a production version of your app:

```sh
npm run build
```

Production preview:

```sh
npm run preview
```

## Copyright

2022-2026 by Nine Internet Solutions AG and Renuo AG – License undecided, assume proprietary
