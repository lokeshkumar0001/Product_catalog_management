const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    banner: String,
    type: String,
    unit: Number,
    price: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    suplier: String,
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [
      {
        message: String,
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  { timestamps: true },
);

const ProductModel = new mongoose.model('Products', productSchema);   // eslint-disable-line

module.exports = ProductModel;
