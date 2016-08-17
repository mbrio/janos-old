# Janos Gat Gallery

The Janos Gat Gallery isomorphic website built on React, Redux, and Node.

## Installation

This is a standard Node 6 application, to begin working on this project execute the following:

```bash
$ npm i
```

There are a ton of NPM scripts you can run, executing the following will display them all:

```bash
$ npm run
```

The application builds some source files and places them within `/src/assets/build`, this path
should be considered ephemeral. If you would like to force clean out this path:

```bash
$ npm run clean
```

## Testing

The following scripts are available within npm for testing purposes:

```bash
$ npm run lint
$ npm run test # run all tests and lint
$ npm run ci # continuous integration
$ npm run start-test # starts the isomorphic server in the local test environment (back-end & front-end)
$ npm run start-webpack-test # starts the webpack server in the local test environment (front-end only)
$ npm run build-test # builds the docker image for the test environment
$ npm run docker-test # starts the isomorphic server in the docker test environment
$ npm run docker-webpack-test # starts the webpack server in the docker test environment
$ npm run docker-ci # starts continuous integration in docker
```

## Development

The following scripts are available within npm for development purposes:

```bash
$ npm run start-devel # starts the isomorphic server in the local development environment (back-end & front-end, no hot reload)
$ npm run start-webpack-devel # starts the webpack server in the local development environment (front-end only, with hot reload)
$ npm run build-devel # builds the docker image for the development environment
$ npm run docker-devel # starts the isomorphic server in the docker development environment (no hot reload)
$ npm run docker-webpack-devel # starts the webpack server in the docker development environment (with hot reload)
```

## Production

The following scripts are available within npm for production purposes:

```bash
$ npm run start # starts the isomorphic server in the local production environment (back-end & front-end)
$ npm run start-webpack # starts the webpack server in the local production environment (front-end only)
$ npm run build # builds the docker image for the production environment
$ npm run docker # starts the isomorphic server in the docker production environment
$ npm run docker-webpack # starts the webpack server in the docker production environment
```
