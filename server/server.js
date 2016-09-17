'use strict';

import express from 'express';
import passport from 'passport';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import bluebird from 'bluebird';

import passportGitHub from './auth/passportGitHub';
import authRoutes from './routes/authRoutes';

dotenv.config({silent: true});
const MongoStore = connectMongo(session);
const MONGO_URI = process.env.MONGO_URI || 'localhost:27017/pintogether';

mongoose.connect(MONGO_URI);

passport.zzzzz = 'test';

const app = express();

app.use(session({
  secret: 'super secret session',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 24 * 365 * 1000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
}));

passportGitHub(passport);
app.use(session({ secret: 'super_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// pug templates
app.set('view engine', 'pug');
app.set('views', './server/views');

app.use(express.static('build'));

app.use('/auth', authRoutes);

app.get('*', (req, res) => {
  return res.render('index');
});

export default app;
