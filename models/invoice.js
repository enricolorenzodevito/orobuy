const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    items: [{ description: String, quantity: Number, price: Number }]
});

module.exports = mongoose.model('Invoice', invoiceSchema);
