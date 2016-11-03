'use strict';

import express from 'express';
import passport from 'passport';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import favicon from 'serve-favicon';

import passportGitHub from './auth/passportGitHub';

// Routes
import authRoutes from './routes/authRoutes';
import pinRoutes  from './routes/pinRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config({silent: true});
const MongoStore = connectMongo(session);
const MONGO_URI = process.env.MONGO_URI || 'localhost:27017/pintogether';

mongoose.connect(MONGO_URI);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(morgan('dev'));

app.use(favicon('./server/public/favicon.ico'));

app.use(session({
  secret: 'supersecretsession',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 24 * 365 * 1000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
}));

passportGitHub(passport);
app.use(passport.initialize());
app.use(passport.session());

// pug templates
app.set('view engine', 'pug');
app.set('views', './server/views');

app.use(express.static('build'));
app.use(express.static('public'));

app.use('/auth', authRoutes);
app.use('/pins', pinRoutes);
app.use('/user', userRoutes);

app.get('/test', (req, res) => {
  return res.send(404);
});

app.get('*', (req, res) => {
  console.log('node env', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'production') {
    return res.render('indexProd');
  }
  return res.render('index');
});

export default app;
