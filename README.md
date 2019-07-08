# agent
fixture reservations, one HTTP call away :soccer:

## local development

### Prerequisites

| tools | remarks |
| --- | --- |
| [Docker]() | required |
| [nvm](https://github.com/nvm-sh/nvm) | for managing your Node JS environment |
| [Redis (_optional_)]() | if you prefer running a Redis instance on host machine; else see docker-compose file |

### Install JS depedencies

First, make sure you are using the right Node JS environment.

```
nvm install  # should install the version specified in .nvmrc
nvm use
```

### Running Serverless Offline

Because we require AWS API Gateway and Lambda functions (with Serverless Framework), we can simply use the [Serverless Offline]() tool to simulate a 'local' API Gateway to invoke our Lambda functions via HTTP interface.

```
serverless-offline &

# test endpoint; FIXME once we implement the API endpoints
curl -X GET http://localhost:3000/hello
```

### Lint

We use Eslint for linting, and follow the now-classic [Airbnb Eslint config](https://www.npmjs.com/package/eslint-config-airbnb).

```
npm run lint
```

### Unit Tests

```
npm test
```

Then, simply install, and grab a cup of coffee while at it :coffee:.

```
npm install  # including dev dependencies
```

### Open API spec

Please see [here](docs/openapi.yml) for the API document (following OpenAPI 3.0).

For a more interactive experience with Swagger UI, you may like to:

```sh
docker-compose up openapi
```

and point to http://localhost:7777
