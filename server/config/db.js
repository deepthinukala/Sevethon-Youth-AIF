const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'YourStrong@Password123',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'YouthAIFDB',
  port: parseInt(process.env.DB_PORT || '1433', 10),
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true', // true for Azure SQL, false for local dev
    trustServerCertificate: true, // Self-signed certs for local development
    connectTimeout: 5000
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// In-memory fallback dataset for instant zero-config offline testing if SQL Server is unready
const memoryDb = {
  sevathonVisitors: [
    {
      VisitorID: 1,
      FullName: 'Aarav Patel',
      Email: 'aarav.p@example.com',
      Phone: '+1 (408) 555-0192',
      VisitorType: 'Youth (10-18)',
      InterestAreas: ['AI courses', 'Hackathons', 'Python'],
      AgeGroup: '15-18',
      EnteredRaffle: true,
      NewsletterOptIn: true,
      QRCheckinCode: 'QR-SEVATHON-8921',
      CheckinSource: 'Sevathon 9/20 Booth',
      RegisteredAt: new Date('2026-09-20T10:30:00Z').toISOString(),
      Status: 'Active',
      Notes: 'Interested in Youth Ambassador role'
    },
    {
      VisitorID: 2,
      FullName: 'Priya Sharma',
      Email: 'priya.sharma@example.org',
      Phone: '+1 (650) 555-0183',
      VisitorType: 'Parent',
      InterestAreas: ['Sanskrit', 'Leadership', 'Psycho-social support'],
      AgeGroup: '25+',
      EnteredRaffle: true,
      NewsletterOptIn: true,
      QRCheckinCode: 'QR-SEVATHON-4412',
      CheckinSource: 'Sevathon 9/20 Booth',
      RegisteredAt: new Date('2026-09-20T11:15:00Z').toISOString(),
      Status: 'Active',
      Notes: 'Mother of 2 teenagers interested in local hub'
    },
    {
      VisitorID: 3,
      FullName: 'Michael Chang',
      Email: 'm.chang@techpartner.com',
      Phone: '+1 (415) 555-0144',
      VisitorType: 'Corporate',
      InterestAreas: ['Internships & Job Pathways', 'Mentorship'],
      AgeGroup: '25+',
      EnteredRaffle: false,
      NewsletterOptIn: true,
      QRCheckinCode: 'QR-SEVATHON-9901',
      CheckinSource: 'Sevathon 9/20 Booth',
      RegisteredAt: new Date('2026-09-20T12:00:00Z').toISOString(),
      Status: 'Active',
      Notes: 'Wants to sponsor hackathon prizes'
    },
    {
      VisitorID: 4,
      FullName: 'Ananya Gupta',
      Email: 'ananya.g@univ.edu',
      Phone: '+1 (408) 555-0177',
      VisitorType: 'Youth (10-18)',
      InterestAreas: ['Vibe coding', 'Web creation', 'Spanish'],
      AgeGroup: '19-25',
      EnteredRaffle: true,
      NewsletterOptIn: true,
      QRCheckinCode: 'QR-SEVATHON-1029',
      CheckinSource: 'Sevathon 9/20 Booth',
      RegisteredAt: new Date('2026-09-20T14:45:00Z').toISOString(),
      Status: 'Active',
      Notes: 'Wants to start hub at local college'
    }
  ],
  newsletterSubscriptions: [
    { SubscriptionID: 1, Email: 'aarav.p@example.com', NewsletterName: 'Both', SubscribedAt: new Date().toISOString() },
    { SubscriptionID: 2, Email: 'ranjan@hubhaya.com', NewsletterName: 'Journey of Starting a Company', SubscribedAt: new Date().toISOString() }
  ],
  contactInquiries: []
};

let pool = null;
let isConnectedToSqlServer = false;

const connectDB = async () => {
  try {
    pool = await sql.connect(dbConfig);
    isConnectedToSqlServer = true;
    console.log('✅ Connected successfully to Microsoft SQL Server:', dbConfig.server, '| DB:', dbConfig.database);
    return pool;
  } catch (err) {
    isConnectedToSqlServer = false;
    console.warn('⚠️ Could not connect to SQL Server:', err.message);
    console.log('💡 Using Fallback Data Store (In-Memory SQL Schema Sync) for zero-config preview mode.');
    return null;
  }
};

const getPool = () => pool;
const isSqlServerActive = () => isConnectedToSqlServer;
const getMemoryDb = () => memoryDb;

module.exports = {
  sql,
  dbConfig,
  connectDB,
  getPool,
  isSqlServerActive,
  getMemoryDb
};
