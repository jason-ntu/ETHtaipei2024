const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const HotelSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  price: {    // in token
    type: Number,
    required: false,
  },
  imageLink: {
    type: [String],
    required: false,
  },
  tags: {
    type: [String],
    required: false
  },
  rating: {
    type: Number,
    required: false
  }
}, { versionKey: false });

const Hotel = mongoose.models.Hotel || model('Hotel', HotelSchema);

module.exports = Hotel;
