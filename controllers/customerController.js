const Customer = require('../models/customer');

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.render('customers/index', { title: 'Get Customers', customers });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createCustomer = async (req, res) => {
    if (req.method === 'GET') {
        res.render('customers/create');
    } else {
        try {
            const customer = new Customer(req.body);
            await customer.save();
            res.redirect('/customers');
        } catch (error) {
            res.status(400).send(error);
        }
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.render('customers/detail', { title: 'Customer',  customer });
    } catch (error) {
        res.status(500).send(error);
    }
};
