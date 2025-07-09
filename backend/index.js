// index.js — entry point for your ShoppyGlobe backend

require('dotenv').config({
  path: require('path').resolve(__dirname, '.env'),
  debug: true
});

console.log('🔒 MONGO_URI loaded:', !!process.env.MONGO_URI);  // Confirms your .env variable is loaded

const connectDB = require('./db');

// First, connect to MongoDB.
// Only once connected do we start the Express server to ensure DB readiness.
connectDB()
  .then(() => {
    console.log('🚀 Database connected — starting Express server');

    const express = require('express');
    const app = express();

    app.use(express.json());  // Allows JSON payloads

    // API route setup
    app.use('/api/products', require('./routes/productRoutes'));
    app.use('/api/auth', require('./routes/authRoutes'));
    app.use('/api/cart',
      require('./middleware/auth'),
      require('./routes/cartRoutes')
    );

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🖥️  Server running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error('❌ Could not start server due to DB connection issue:', err);
  });



