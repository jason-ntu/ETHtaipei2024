const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  walletAddress: {
    type: String,
    required: false,
  },
  /*
  tokenAmount: {   // 感覺會在 chain 上
    type: Number,
    required: false,
  },
  */
});

const User = mongoose.models.User || model('User', UserSchema);

module.exports = { User };
