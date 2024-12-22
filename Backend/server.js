// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); 
const protectedRoutes = require('./routes/protectedRoutes'); 

// Load environment variables from the .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON payloads
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); 
  });

// Define routes
app.use('/api/auth', authRoutes); 
app.use('/api/protected', protectedRoutes); 

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err); 
  res.status(500).json({ error: 'An unexpected error occurred on the server.' });
});

// Define the server port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running and accessible on port ${port}.`);
});