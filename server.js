require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



