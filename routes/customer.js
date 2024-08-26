const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// Crea un nuovo cliente
router.post('/', async (req, res) => {
    const customer = new Customer(req.body);
    try {
        await customer.save();
        res.status(201).send(customer);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Recupera tutti i clienti
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
