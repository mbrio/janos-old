import ServerPlugin from './ServerPlugin';
import createApiRouter from '../api';

export default class ApiPlugin extends ServerPlugin {
  constructor(server) {
    super(server);

    // Setup the API that servers our application code
    this.server.app.use(createApiRouter('/api'));
  }
}
