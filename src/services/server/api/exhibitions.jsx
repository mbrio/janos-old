import pathutil from 'path';

const dataAssetsPath = pathutil.join(__dirname, '..', '..', '..', 'assets', 'data');

export default function createExhibitionsApi(app, prefix) {
  app.route(`${prefix}/exhibitions`)
    .get((req, res) => {
      const options = {
        root: dataAssetsPath,
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true,
        },
      };

      res.sendFile('exhibitions.json', options, err => {
        if (err) {
          console.log(err); // eslint-disable-line no-console
          res.status(err.status).end();
        }
      });
    });
}
