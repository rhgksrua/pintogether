'use strict';

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.json({ error: 'authentication failed' });
}

export default isAuthenticated;
