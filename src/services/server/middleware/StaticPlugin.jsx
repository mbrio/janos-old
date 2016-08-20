import pathutil from 'path';
import express from 'express';
import ServerPlugin from './ServerPlugin';

export default class StaticPlugin extends ServerPlugin {
  constructor(server) {
    super(server);

    // Setup static serving of files within the assets folder.
    this.server.app.use(express.static(pathutil.join(__dirname, '..', '..', 'assets')));
  }
}
