require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const DB_URI = process.env.MONGODB_URI;

// we connect to Mongo  asynchronously
const startServer = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Connected to local MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Oups, there is a Database connection error:', error);
    process.exit(1);
  }
};

startServer();
