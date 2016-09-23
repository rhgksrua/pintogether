'use strict';

import bluebird from 'bluebird';
import mongoose from 'mongoose';
mongoose.Promise = bluebird;

const pinSchema = mongoose.Schema({
  username: { type: String, required: true },
  userId: { type: String, required: true },
  likes: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  pin: {
    title: { type: String, required: true },
    url: { type: String, required: true }
  }
});


export default mongoose.model('Pin', pinSchema);

