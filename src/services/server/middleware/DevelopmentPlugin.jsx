import chokidar from 'chokidar';
import ServerPlugin from './ServerPlugin';

/**
 * A Server plugin that sets up the development environment. It starts watching source files for
 * changes and shuts down the server when a change occurs. This is used ensure updates to code are
 * immediately reflected in the running server. It begins a socket.io server that is used to tell
 * the browser to refresh when updates are made.
 */
export default class DevelopmentPlugin extends ServerPlugin {
  /**
   * Starts watching files for changes, shuts down the process if a change occurs.
   */
  startWatching() {
    if (this.watcher) { throw new Error('Already watching for changes.'); }
    const watchPath = this.server.config.path('src');

    // Begin watching the src directory
    this.watcher = chokidar.watch(watchPath, {
      ignored: [
        /[\/\\]\./, // Exclude dot files
        // TODO: Build this from config data
        /[\/\\]src[\/\\]assets[\/\\]build/, // Exclude our build files
      ],
      ignoreInitial: true,
    }).on('all', () => process.exit());
  }

  /**
   * Stops watching files for changes.
   */
  stopWatching() {
    if (!this.watcher) { return; }

    this.watcher.close();
  }

  /**
   * Starts all development processes.
   */
  start() {
    if (this.server.config.isDevelopment) { this.startWatching(); }
  }

  /**
   * Stops all development processese.
   */
  stop() {
    this.stopWatching();
  }
}
