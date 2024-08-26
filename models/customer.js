const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    taxCode: String
});

module.exports = mongoose.model('Customer', customerSchema);