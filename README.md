# agent
fixture reservations, one HTTP call away :soccer:

## local development

### Prerequisites

| tools | remarks |
| --- | --- |
| [Docker]() | required |
| [nvm](https://github.com/nvm-sh/nvm) | for managing your Node JS environment |
| [Redis (_optional_)]() | if you prefer running a Redis instance on host machine; else see docker-compose file |

### Open API spec

Please see [here](docs/openapi.yml) for the API document (following OpenAPI 3.0).

For a more interactive experience with Swagger UI, you may like to:

```sh
docker-compose up openapi
```

and point to http://localhost:7777
