const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    fiscalCode: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Customer', customerSchema);
