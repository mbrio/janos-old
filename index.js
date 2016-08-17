require('babel-register')();
const chokidar = require('chokidar');
const pathutil = require('path');
const { fork } = require('child_process');
const { start } = require('./src/services/server');

// When in a development environment we want to watch changes to the services file structure and
// restart as necessary.
if (process.env.NODE_ENV === 'development' && !process.env.FORK_FORCE_START) {
  const env = Object.assign({}, process.env, { FORK_FORCE_START: true });
  let proc = null;

  console.log('Begin watching file changes'); // eslint-disable-line no-console

  chokidar.watch(pathutil.join(__dirname, 'src', 'services'), {
    ignored: /[\/\\]\./,
    ignoreInitial: true,
  })
    .on('all', (event, path) => {
      console.log('File system event has occurred', event, path); // eslint-disable-line no-console
      console.log('Restarting server...'); //eslint-disable-line

      if (proc) { proc.kill(); }
      proc = fork('./index', [], { env });
    });

  proc = fork('./index', [], { env });
} else {
  start().then(() => {
    console.log('All systems up.'); // eslint-disable-line no-console
  });
}
