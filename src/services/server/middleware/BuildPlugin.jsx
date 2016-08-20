import ServerPlugin from './ServerPlugin';
import webpackBuild from '../../../lib/build/webpackBuild';
import webpackConfig from '../../../../config/build/webpack.config';

export default class BuildPlugin extends ServerPlugin {
  start() {
    return webpackBuild(webpackConfig).then(stats => {
      if (process.env.NODE_ENV === 'development') {
        console.log(stats.toString()); // eslint-disable-line no-console
      }
    });
  }
}
