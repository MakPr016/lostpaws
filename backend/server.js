const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const methodOverride = require("method-override");

dotenv.config();
connectDB();

const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'app'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Frontend Routes
app.get('/', (req, res) => {
    res.render('index.html');
});
app.get('/adopt', (req, res) => {
    res.render('adopt.html');
});
app.get('/donate', (req, res) => {
    res.render('donate.html');
});
app.get('/login', (req, res) => {
    res.render('login.html');
});
app.get('/report', (req, res) => {
    res.render('report.html');
});
app.get('/shelters', (req, res) => {
    res.render('shelters.html');
});


// Backend API Routes
app.use('/api/animals', require('./routes/animalRoute'));
app.use('/api/shelters', require('./routes/shelterRoute'));
app.use('/api/users', require('./routes/userRoute'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running : http://localhost:${process.env.PORT}/`);
});