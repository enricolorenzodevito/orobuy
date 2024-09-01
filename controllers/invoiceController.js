const Invoice = require('../models/invoice');
const Customer = require('../models/customer');

exports.getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('customer');
        res.render('invoices/index', { title: 'Get Invoices',  invoices });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createInvoice = async (req, res) => {
    if (req.method === 'GET') {
        const customers = await Customer.find();
        res.render('invoices/create', { customers });
    } else {
        try {
            const items = req.body.items.split('\n').map(line => {
                const [description, quantity, price] = line.split(',');
                return { description, quantity: Number(quantity), price: Number(price) };
            });
            const invoice = new Invoice({
                customer: req.body.customer,
                amount: req.body.amount,
                items: items
            });
            await invoice.save();
            res.redirect('/invoices');
        } catch (error) {
            res.status(400).send(error);
        }
    }
};

exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('customer');
        res.render('invoices/detail', { invoice });
    } catch (error) {
        res.status(500).send(error);
    }
};
