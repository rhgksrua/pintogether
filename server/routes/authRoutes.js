import express from 'express';
import passport from 'passport';

const router = express.Router();

/**
 * Uses passport-github2 stragety to log in users.
 * Checkout passport package for more information.
 */

/**
 * Redirects user to github for login.
 *
 * @returns {undefined}
 */
router.get('/github', passport.authenticate('github', {scope: ['user:email']}), 
  (req, res) => {
    // passport handles redirects.
});


/**
 * Callback url from github.
 *
 * @returns {undefined}
 */
router.get('/github/callback', passport.authenticate('github', {failureRedirect: '/'}),
  (req, res) => {
    res.render('loggedIn', { username: req.user.username });
});

  
/**
 * Almost impossible to get failed log in process unless there is a problem
 * with github.  If users have a valid github account, this will never see light of day.
 */
router.get('/failed', (req, res) => {
  res.render('authFailure');
});

export default router;
