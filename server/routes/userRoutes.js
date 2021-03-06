'use strict';

import express from 'express';

import isAuthenticated from '../lib/isAuthenticated';

const router = express.Router();

router.post('/login', isAuthenticated, checkLogin);

router.post('/logout', isAuthenticated, logOut);

/**
 * checkLogin
 *
 * Allows client to check login status based on
 * session cookie created by passport
 *
 * @param req
 * @param res
 * @returns {undefined}
 */
function checkLogin(req, res) {
  const { id, username, email } = req.user;
  return res.json({
    username,
    email,
    id
  });
}

function logOut(req, res) {
  req.logout();
  return res.json({
    status: 'logged out'
  });
}

export default router;
