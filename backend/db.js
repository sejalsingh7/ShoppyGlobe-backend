// backend/db.js
const mongoose = require('mongoose');
mongoose.set('debug', true);

console.log('📡 [DB] Starting connection function…');


function connectDB() {
  console.log('📡 Connecting to MongoDB...');
  return mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    })
    .then((conn) => {
      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      process.exit(1); // stop server if DB fails
    });
}

module.exports = connectDB;
