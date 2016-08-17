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

# Project Structure

* **/config** Used to store application configuration files
* **/config/build** Used to store configuration files for building the application (*webpack*)
* **/config/deploy** Used to store configuration files for deploying the application (*docker*)
* **/spec** Tests
* **/src** Used to store source files
* **/src/assets** Used to store static assets such as images, videos, etc.
* **/src/build** Used to store built static assets such as client JS files
* **/src/client** Used to store the React application used as the client to the application
* **/src/client/containers** Used to store React HOCs (higher order component) for composition
* **/src/client/components** Used to store reusable React components
* **/src/client/routes** Used to store React components that correspond to routes
* **/src/services** Used to store service applications
* **/src/services/server** The web server of the application

# React LInks

* [HOC Pattern](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775)
* [Mixins Are Dead. Long Live Composition](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.uxaxlg62x)
* [React Higher Order Components in depth](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.eng72rxa6)
* [The Cost of Small Modules](https://nolanlawson.com/2016/08/15/the-cost-of-small-modules/)
