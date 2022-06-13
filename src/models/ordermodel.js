const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'userData',
    },
    productId: {
      type: ObjectId,
      ref: 'Product',
    },
    amount: {
      type: Number,
    },
    date: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
