const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection via env with safe fallback
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopsmart';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('ShopSmart backend is running 🚀');
});

// ✅ Product API route
app.use('/api/products', productRoutes);

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});