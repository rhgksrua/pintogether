import express from 'express';
import passport from 'passport';

import Pin from '../models/Pin';
import isAuthenticated from '../lib/isAuthenticated';

const router = express.Router();

router.post('/', isAuthenticated, addPins);
router.get('/', getPins);
router.get('/:username', getUserPins);

/**
 * addPins - Protected route.
 *
 * Adds new pins
 *
 * @param req
 * @param res
 * @returns {undefined}
 */
function addPins(req, res) {
  const { title, url } = req.body;
  const { username, id } = req.user;
  const newPin = new Pin();
  newPin.username = username;
  newPin.userId = id;
  newPin.pin.title = title;
  newPin.pin.url = url;
  newPin.save(err => {
    if (err) {
      console.log(err.message);
      return res.json({ error: true, message: 'new pin db error' });
    }
    return res.json({ 
      completed: true,
      pin: {
        title, 
        url 
      }
    });
  });

  //res.json({ completed: true, pin: { title, url } });
};

function getPins(req, res) {
  const query = {};
  const projection = {};
  Pin.find(query, projection).exec()
    .then(doc => {
      return res.json({pins: doc});
    });
}

function getUserPins(req, res) {
  const { username } = req.params;
  console.log(username);
  const query = {
    username
  }
  Pin.find(query).exec()
    .then(doc => {
      return res.json({pins: doc});
    })
    .catch(err => {
      console.log(err);
      return res.json({error: true, message: 'db error'});
    });
}


export default router;

