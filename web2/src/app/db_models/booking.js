const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const BookingSchema = new Schema({
  userId: {
    type: String,
    required: false,
  },
  hotelId: {
    type: String,
    required: false,
  },
  CCM_txHash: {
    type: String,
    required: false,
  },
  CCR_txHash: {
    type: String,
    required: false,
  }
}, { versionKey: false });

const Booking = mongoose.models.Booking || model('Booking', BookingSchema);

module.exports = Booking;
