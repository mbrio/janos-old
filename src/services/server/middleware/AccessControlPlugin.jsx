import ServerPlugin from './ServerPlugin';

export default class AccessControlPlugin extends ServerPlugin {
  constructor(server) {
    super(server);

    // Setup access control headers
    this.server.app.use((req, res, next) => {
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With',
      });

      next();
    });
  }
}
