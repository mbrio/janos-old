/**
 * Sets up the access control headers for access from all domains.
 *
 * @param {object} req - The express request
 * @param {object} res - The express response
 */
export default function accessControl(req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With',
  });

  next();
}
