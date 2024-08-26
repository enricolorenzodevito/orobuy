const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const Customer = require('../models/customer');
const PDFDocument = require('pdfkit');

// Crea una nuova fattura
router.post('/', async (req, res) => {
    const invoice = new Invoice(req.body);
    try {
        await invoice.save();
        res.status(201).send(invoice);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Recupera tutte le fatture
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('customer');
        res.status(200).send(invoices);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Genera e scarica una fattura come PDF
router.get('/:id/pdf', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('customer');
        if (!invoice) {
            return res.status(404).send('Fattura non trovata');
        }

        const doc = new PDFDocument();
        const filename = `Fattura_${invoice._id}.pdf`;

        res.setHeader('Content-disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-type', 'application/pdf');

        doc.fontSize(20).text('Fattura', { align: 'center' });
        doc.fontSize(12).text(`Data: ${invoice.date.toDateString()}`);
        doc.text(`Cliente: ${invoice.customer.firstName} ${invoice.customer.lastName}`);
        doc.text(`Indirizzo: ${invoice.customer.address}, ${invoice.customer.city}`);
        doc.text(`Codice Fiscale: ${invoice.customer.taxCode}`);
        doc.moveDown();

        let total = 0;
        invoice.items.forEach(item => {
            doc.text(`${item.description} - Quantità: ${item.quantity} - Prezzo: €${item.price}`);
            total += item.quantity * item.price;
        });

        doc.moveDown();
        doc.text(`Totale: €${total}`, { align: 'right' });
        doc.end();

        doc.pipe(res);

    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
