'use strict';

import express from 'express';
import path from 'path';
import './auth/passport';


const app = express();

// pug templates
app.set('view engine', 'pug');
app.set('views', './server/views');

app.use(express.static('build'));

const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
  console.log(p);
  return res.render('index');
});

app.listen(port, () => {
  console.log(`localhost://${port}`);
});
