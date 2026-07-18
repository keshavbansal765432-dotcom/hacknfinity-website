require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const seedDatabase = require('./src/config/seed');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount API Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/events', require('./src/routes/events'));
app.use('/api/certificates', require('./src/routes/certificates'));
app.use('/api/applications', require('./src/routes/applications'));
app.use('/api/contact', require('./src/routes/contact'));
app.use('/api/blogs', require('./src/routes/blog'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Start Server & Connect Database
const startServer = async () => {
  const isConnected = await connectDB();
  
  // If successfully connected to database, seed it
  if (isConnected) {
    await seedDatabase();
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
