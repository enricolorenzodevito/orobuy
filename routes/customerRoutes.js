const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// List all customers
router.get('/', customerController.getCustomers);

// Create a new customer (GET and POST)
router.get('/new', customerController.createCustomer);
router.post('/new', customerController.createCustomer);

// View a specific customer
router.get('/:id', customerController.getCustomerById);

module.exports = router;
