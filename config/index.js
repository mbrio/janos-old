import pathutil from 'path';
import Config from '../src/lib/Config';

export default new Config({
  build: {
    rootPath: './src/assets/',
    path: '/build',
  },
  // Passed to client application as app.config, do not store secure information here
  client: {
    helmet: {
      title: 'Janos Gat Gallery',
      titleTemplate: '%s | Janos Gat Gallery',
    },
  },
}, {
  cwd: pathutil.join(__dirname, '..'),
});
