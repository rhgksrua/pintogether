'use strict';

import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  github: {
    email: String,
    username: String,
  }
});

export default mongoose.model('User', userSchema);
