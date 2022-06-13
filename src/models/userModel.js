const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    balance: {
      type: Number,
      default: 100,
    },
    address: String,
    age: Number,
    emailId: String,
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('userData', userSchema);