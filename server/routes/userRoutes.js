'use strict';

import express from 'express';

import isAuthenticated from '../lib/isAuthenticated';

const router = express.Router();

router.post('/login', isAuthenticated, checkLogin);

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
  const { username, email } = req.user;
  return res.json({
    username,
    email
  });
}

export default router;
