# Typescript project

This is the mono repository template for the Typescrip projects.

## Basic usage

Clone the current repository and run the following from the root of the repository folder:

```bash
npm i -g lerna yarn tsc ts-node ts-node-dev typescript
lerna bootstrap
```
### Trace API calls and Monitor API performance, health and usage statistics

After setting up [swagger-stats](https://github.com/slanatech/swagger-stats) middleware in app and after server start,
go to the url *http:/<your app host:port>/swagger-stats/ux* for the statistics
