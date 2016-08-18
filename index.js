require('babel-register')();
// const chokidar = require('chokidar');
// const pathutil = require('path');
// const webpackBuild = require('./src/lib/build/webpackBuild').default;
// const webpackConfig = require('./config/build/webpack.config');
// const pseries = require('./src/lib/pseries').default;
// const { fork } = require('child_process');
// const { start } = require('./src/services/server');

const { start } = require('./src/services/server');

start();


// /**
//  * Forks the server for use in development mode, this allows us to restart the service if any
//  * changes occur.
//  *
//  * @param  {Object} env - The environment variables to make available to the process
//  * @return {Object} - The child_process object
//  */
// function forkServer(env) {
//   return fork('./index', [], { env });
// }
//
// /**
//  * Builds the static dependencies of the applicaiton.
//  *
//  * @return {Promise}
//  */
// function buildDeps() {
//   console.log('Building webpack...'); // eslint-disable-line no-console
//   return webpackBuild(webpackConfig).then(stats => {
//     console.log(stats.toString()); // eslint-disable-line no-console
//   });
// }
//
// /**
//  * Starts the web server
//  *
//  * @return {Promise}
//  */
// function startServer() {
//   return start().then(() => {
//     console.log('All systems up.'); // eslint-disable-line no-console
//   });
// }
//
// // When in a development environment we want to watch changes to the services file structure and
// // restart as necessary. In order to do this we fork this module and pass a new environment
// // variable called FORK_FORCE_START, this will allow us in development mode to kill the server
// // process and restart it.
//
// // When we are in development and we have not been forked yet
// if (process.env.NODE_ENV === 'development' && !process.env.FORK_FORCE_START) {
//   const env = Object.assign({}, process.env, { FORK_FORCE_START: true });
//   let proc = null;
//
//   console.log('Begin watching file changes'); // eslint-disable-line no-console
//
//   // Begin watching the src directory
//   chokidar.watch(pathutil.join(__dirname, 'src'), {
//     ignored: [
//       /[\/\\]\./, // Exclude dot files
//       /[\/\\]src[\/\\]assets[\/\\]build[\/\\]/, // Exclude our build files
//     ],
//     ignoreInitial: true,
//   })
//     .on('all', (event, path) => { // On all file events
//       console.log('File system event has occurred', event, path);
//       console.log('Restarting server...'); //eslint-disable-line
//
//       if (proc) { proc.kill(); } // If the process already exists kill it so we can restart it
//       proc = forkServer(env); // Fork the new server
//     });
//
//   proc = forkServer(env); // Fork the initial server
// } else {
//   // A series of promise factories that need to be executed in order to start the server
//   const promises = [buildDeps, startServer];
//
//   // Execute the startup scripts in series
//   pseries(promises);
// }
