import chokidar from 'chokidar';

/**
 * A Server plugin that sets up the development environment. It starts watching source files for
 * changes and shuts down the server when a change occurs. This is used ensure updates to code are
 * immediately reflected in the running server. It begins a socket.io server that is used to tell
 * the browser to refresh when updates are made.
 */
export default class Development {
  /**
   * Starts watching files for changes, shuts down the process if a change occurs.
   *
   * @param {Server} server = The server that is has ownership over the plugin.
   */
  startWatching(server) {
    if (this.watcher) { throw new Error('Already watching for changes.'); }
    const watchPath = server.config.path('src');

    // Begin watching the src directory
    this.watcher = chokidar.watch(watchPath, {
      ignored: [
        /[\/\\]\./, // Exclude dot files
        // TODO: Build this from config data
        /[\/\\]src[\/\\]assets[\/\\]build/, // Exclude our build files
      ],
      ignoreInitial: true,
    })
      .on('all', () => { // On all file events
        process.exit();
      });
  }

  /**
   * Stops watching files for changes.
   *
   * @param {Server} server = The server that is has ownership over the plugin.
   */
  stopWatching() {
    if (!this.watcher) { return; }

    this.watcher.close();
  }

  /**
   * Starts all development processes.
   *
   * @param {Server} server = The server that is has ownership over the plugin.
   */
  start(server) {
    if (server.config.isDevelopment) { this.startWatching(server); }
  }

  /**
   * Stops all development processese.
   *
   * @param {Server} server = The server that is has ownership over the plugin.
   */
  stop(server) {
    this.stopWatching(server);
  }
}
