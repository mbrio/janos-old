/**
 * Base class for Server plugins
 */
export default class ServerPlugin {
  /**
   * The constructor, defines a property `server` on the plugin instance.
   */
  constructor(server) {
    // TODO: Figure out why this is not inheritable.
    // Object.defineProperty(this, 'server', () => server);
    this.server = server;
  }

  /**
   * Used during the start process of the Server instance, inheritors should override
   */
  start() {}

  /**
   * Used during the stop process of the Server instance, inheritors should override
   */
  stop() {}
}
