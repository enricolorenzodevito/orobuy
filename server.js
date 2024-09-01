require('dotenv').config();
const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customerRoutes');
const invoiceRoutes = require('./routes/invoicesRoutes');
const path = require('path');
const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


app.set("layout extractScripts", true)
app.set('view engine', 'ejs');

// Set views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', { layout:'layout.ejs' });

// Middleware for serving static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

app.use('/customers', customerRoutes);
app.use('/invoices', invoiceRoutes);
// Redirect to /invoices on the homepage

app.get('/layout', (_req, res, _next) => {
    res.render('layout', {layout: 'layout.ejs', 
    });
    //user:req.user});
  });

app.get('/', (req, res) => {
    res.render('index.ejs', { title: 'Home' });
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

