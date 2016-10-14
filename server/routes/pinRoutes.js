'use strict';

import express from 'express';
import passport from 'passport';

import Pin from '../models/Pin';
import isAuthenticated from '../lib/isAuthenticated';

const router = express.Router();

// '/pins' base route

// Add user pins
router.post('/', isAuthenticated, addPins);

// Return all pins
router.get('/', getPins);

// Return user pins
router.get('/:username', getUserPins);

// Like or unlike pins
router.post('/like', isAuthenticated, pinLiked);

// Remove user pin
router.delete('/', isAuthenticated, removePin);

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

/**
 * pinLiked
 *
 * Should toggle between like and not liked.
 *
 * @param req
 * @param res
 * @returns {undefined}
 */
function pinLiked(req, res) {
  const { pinId } = req.body;
  const { id: userId } = req.user;

  // find pin and remove userId if it exists
  const query = {
    _id: pinId,
    'likes.userId': userId
  };
  const update = {
    $pull: {
      likes: {
        userId
      }
    }
  };
  Pin.update(query, update).exec()
    .then(writeResult => {
      if (writeResult.nModified < 1) {
        // nothing to do since either pin or user does not exist.  Need to attempt
        // to add userId to the pin. Note: pin might not exist
        return addUserLike(pinId, userId);
      }
      return writeResult;
    })
    .then(writeResult => {
      // recieves writeResult from removing or adding userId to likes.
      // If nModified is 0, most likely pin does not exist.
      if (writeResult.nModified > 0) {
        return res.json({status: true, id: userId});
      } else {
        throw new Error('cannot like pins');
      }
    })
    .catch(err => {
      console.log(err);
      return res.json({error: true, message: 'db error'});
    });
}

function addUserLike(pinId, userId) {
  const query = {
    _id: pinId
  };
  const update = {
    $push: {
      likes: {
        userId
      }
    }
  };
  return Pin.update(query, update).exec();
}


function removePin(req, res) {
  const { pinId } = req.body;
  const { id: userId } = req.user;
  const query = {
    userId,
    _id: pinId
  };
  Pin.remove(query).exec()
    .then(doc => {
      if (doc.result.n > 0) {
        return res.json({status: 'good'});
      }
      throw new Error('does not exist');
    })
    .catch(err => {
      console.log(err);
      return res.json({error: 'db error'});
    });

}

export default router;

