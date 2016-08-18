import pathutil from 'path';
import express from 'express';

const dataAssetsPath = pathutil.join(__dirname, '..', '..', '..', 'assets', 'data');

export default function createArtistsApi(prefix) {
  const router = express.Router(); // eslint-disable-line new-cap

  router.route(`${prefix}/artists`)
    .get((req, res) => {
      const options = {
        root: dataAssetsPath,
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true,
        },
      };

      res.sendFile('artists.json', options, err => {
        if (err) {
          console.log(err); // eslint-disable-line no-console
          res.status(err.status).end();
        }
      });
    });

  return router;
}
