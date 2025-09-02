const mongoose = require('mongoose');
const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Use the existing seed data file
const filePath = path.join(__dirname, '../dataa/products-seed.json');
const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopsmart';

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding');

    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products to MongoDB`);
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    await mongoose.connection.close();
  }
}

seedDB();