const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config( { path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const passwords = require('./routes/passwords');

const app = express();

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

// Mount routers
app.use('/api/v1/passwords', passwords);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgGreen));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.bgBrightRed);
  // Close server and exit process
  server.close(() => process.exit(1));
});

