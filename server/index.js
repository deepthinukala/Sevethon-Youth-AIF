const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB, isSqlServerActive } = require('./config/db');
const sevathonRoutes = require('./routes/sevathonRoutes');
const programRoutes = require('./routes/programRoutes');
const contactRoutes = require('./routes/contactRoutes');

const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// API Routes
app.use('/api/sevathon', sevathonRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/contact', contactRoutes);

// Serve Static Frontend Build Files (React SPA)
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    }
  });
}

// Health & System Info Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Healthy',
    service: 'YouthAIF API & Sevathon 9/20 Visitor System',
    timestamp: new Date().toISOString(),
    sqlServerConnected: isSqlServerActive(),
    databaseDriver: isSqlServerActive() ? 'Microsoft SQL Server (mssql)' : 'InMemory Fallback Data Store (Sync DB Ready)',
    contactInfo: {
      email: 'ranjan@hubhaya.com',
      phone: '+1 (408) 483-3082',
      linkedin: 'https://www.linkedin.com/in/desairanjan',
      youtube: '@nam-mindfulness',
      website: 'https://www.YouthAIF.org'
    }
  });
});

// Root API Welcome Endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to YouthAIF Node.js & SQL Server API',
    endpoints: {
      sevathonCheckin: 'POST /api/sevathon/checkin',
      sevathonVisitors: 'GET /api/sevathon/visitors',
      sevathonStats: 'GET /api/sevathon/stats',
      programs: 'GET /api/programs',
      newsletter: 'POST /api/contact/newsletter',
      contact: 'POST /api/contact/message'
    }
  });
});

// Initialize DB and start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 YouthAIF Node.js Server running on port ${PORT}`);
    console.log(`🔗 API Base: http://localhost:${PORT}/api`);
    console.log(`🎯 Sevathon Visitor Endpoint: http://localhost:${PORT}/api/sevathon/checkin`);
  });
};

startServer();
