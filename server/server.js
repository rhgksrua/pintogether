'use strict';

import express from 'express';
import passport from 'passport';
import path from 'path';
import session from 'express-session';
import passportGitHub from './auth/passportGitHub';
import dotenv from 'dotenv';

dotenv.config({silent: true});

const app = express();

passportGitHub(passport);
app.use(session({ secret: 'super_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// pug templates
app.set('view engine', 'pug');
app.set('views', './server/views');

app.use(express.static('build'));

const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
  return res.render('index');
});

app.get('/auth/github', passport.authenticate('github', {scope: ['user:email']}), 
  (req, res) => {
    // passport handles redirects.
});

app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/'}),
  (req, res) => {
    console.log(req.user);
    res.send('login success');
});

app.listen(port, () => {
  console.log(`localhost://${port}`);
});
