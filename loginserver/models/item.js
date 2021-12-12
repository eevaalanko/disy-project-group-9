const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  amount: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model('Item', schema);
