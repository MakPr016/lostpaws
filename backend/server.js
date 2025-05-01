const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/animals', require('./routes/animalRoute'));
app.use('/api/shelters', require('./routes/shelterRoute'));
app.use('/api/users', require('./routes/userRoute'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running : http://localhost:${process.env.PORT}/`);
});