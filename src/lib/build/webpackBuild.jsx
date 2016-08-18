import webpack from 'webpack';

export default function webpackBuild(config) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);

    compiler.run((err, stats) => {
      if (err) { return reject(err); }
      return resolve(stats);
    });
  });
}
