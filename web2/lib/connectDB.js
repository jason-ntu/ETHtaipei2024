const mongoose = require('mongoose');

function connectToDatabase() {
  mongoose.connect('mongodb://127.0.0.1:27017/circoda');
}

module.exports = { connectToDatabase };
