const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    street: String,
    postalCode: String,
    city: String,
    country: String
});

const addressModel =  mongoose.model('address', AddressSchema);

module.exports = addressModel