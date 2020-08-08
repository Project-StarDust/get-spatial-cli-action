# Get SpatialOS CLI Github Action

![](https://img.shields.io/badge/license-MIT-blue)

This Github Action installs the `spatial` CLI.

## Example Workflow

```yaml
on: [push]

name: CI

jobs:
  build: 
    name: Build SpatialOS project
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: jamiebrynes7/get-spatial-cli-action@v1
        with:
          version: 20190416.094616.a865bb5b54
          refresh_token: "${OAUTH_TOKEN_SECRET}"
      - run: spatial build
```

## Inputs

| Name            | Required | Description                                 | Type   | Default  |
|-----------------|:--------:|---------------------------------------------|--------|----------|
| `refresh_token` |    ✓     | The auth token to use for the Spatial CLI.  | string |          |
| `version`       |          | The version of the Spatial CLI to download. | string | "latest" |

## Developing

Install the dependencies  
```bash
$ npm install
```

Build the typescript
```bash
$ npm run build
```

Run the tests :heavy_check_mark:  
```bash
$ npm test
```
