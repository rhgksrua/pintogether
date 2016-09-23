import express from 'express';
import passport from 'passport';

import Pin from '../models/Pin';
import isAuthenticated from '../lib/isAuthenticated';

const router = express.Router();

router.post('/', isAuthenticated, addPins);
router.get('/', getPins);

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
  const newPin = new Pin();
  // need to replace username and id
  newPin.username = 'john';
  newPin.userId = '1234';
  newPin.pin.title = title;
  newPin.pin.url = url;
  newPin.save(err => {
    if (err) return res.json({ error: true, message: 'new pin db error' });

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
  res.json({pins: 'all pins'});
}


export default router;

