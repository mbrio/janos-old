const Server = require('./src/services/server/Server');

Server.start().then(() => {
  console.log('Server started.');
});
