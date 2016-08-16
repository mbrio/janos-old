const Server = require('./src/Server');

Server.start().then(() => {
  console.log('Server started.');
});
