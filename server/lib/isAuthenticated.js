'use strict';

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('auth failed');
  return res.sendStatus(404);
}

export default isAuthenticated;
