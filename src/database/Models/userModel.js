const mognoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = mognoose.Schema(
  {
    name: String,
    phone: String,
    email: {
      type: String,
      required: [true, 'Enter email to register'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Enter password to register'],
    },
    role: {
      type: String,
      default: 'user',
    },
    cart: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'product' },
        unit: { type: Number },
      },
    ],
    address: [
      {
        type: mognoose.Types.ObjectId,
        ref: 'address',
      },
    ],
    wishlist: [
      {
        type: mognoose.Types.ObjectId,
        ref: 'product',
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'order',
      },
    ],
  },
  {
    toJson: {
      transform(doc, ret) {
        // eslint-disable-next-line no-param-reassign
        delete ret.password;
      },
    },
    timestamps: true,
  },
);

const UserModel = new mognoose.model('User', userSchema);
module.exports = UserModel;
