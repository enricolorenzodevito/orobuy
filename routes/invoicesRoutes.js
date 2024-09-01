const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// List all invoices
router.get('/', invoiceController.getInvoices);

// Create a new invoice (GET and POST)
router.get('/new', invoiceController.createInvoice);
router.post('/new', invoiceController.createInvoice);

// View a specific invoice
router.get('/:id', invoiceController.getInvoiceById);

module.exports = router;
