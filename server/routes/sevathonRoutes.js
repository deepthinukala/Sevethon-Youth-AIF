const express = require('express');
const router = express.Router();
const { getPool, isSqlServerActive, getMemoryDb, sql } = require('../config/db');

// POST /api/sevathon/checkin - Register a new Sevathon 9/20 Booth Visitor
router.post('/checkin', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      visitorType = 'Visitor',
      interestAreas = [],
      ageGroup = '15-18',
      enteredRaffle = true,
      newsletterOptIn = true,
      notes = ''
    } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ success: false, message: 'Full name and email are required.' });
    }

    const qrCode = 'QR-SEV-' + Math.floor(1000 + Math.random() * 9000);
    const interestsString = Array.isArray(interestAreas) ? interestAreas.join(', ') : interestAreas;

    if (isSqlServerActive()) {
      const pool = getPool();
      const result = await pool.request()
        .input('FullName', sql.NVarChar(100), fullName)
        .input('Email', sql.NVarChar(150), email)
        .input('Phone', sql.NVarChar(30), phone || null)
        .input('VisitorType', sql.NVarChar(50), visitorType)
        .input('InterestAreas', sql.NVarChar(sql.MAX), interestsString)
        .input('AgeGroup', sql.NVarChar(30), ageGroup)
        .input('EnteredRaffle', sql.Bit, enteredRaffle ? 1 : 0)
        .input('NewsletterOptIn', sql.Bit, newsletterOptIn ? 1 : 0)
        .input('Notes', sql.NVarChar(sql.MAX), notes)
        .query(`
          INSERT INTO dbo.SevathonVisitors (
            FullName, Email, Phone, VisitorType, InterestAreas, AgeGroup, EnteredRaffle, NewsletterOptIn, Notes, QRCheckinCode
          )
          OUTPUT INSERTED.VisitorID, INSERTED.RegisteredAt
          VALUES (
            @FullName, @Email, @Phone, @VisitorType, @InterestAreas, @AgeGroup, @EnteredRaffle, @NewsletterOptIn, @Notes, '${qrCode}'
          )
        `);

      const inserted = result.recordset[0];
      return res.status(201).json({
        success: true,
        message: 'Thank you for visiting our YouthAIF booth at Sevathon 9/20!',
        visitor: {
          id: inserted.VisitorID,
          fullName,
          email,
          visitorType,
          qrCode,
          registeredAt: inserted.RegisteredAt
        }
      });
    } else {
      // In-Memory Fallback
      const memoryDb = getMemoryDb();
      const newVisitor = {
        VisitorID: memoryDb.sevathonVisitors.length + 1,
        FullName: fullName,
        Email: email,
        Phone: phone || '',
        VisitorType: visitorType,
        InterestAreas: Array.isArray(interestAreas) ? interestAreas : [interestAreas],
        AgeGroup: ageGroup,
        EnteredRaffle: Boolean(enteredRaffle),
        NewsletterOptIn: Boolean(newsletterOptIn),
        QRCheckinCode: qrCode,
        CheckinSource: 'Sevathon 9/20 Booth',
        RegisteredAt: new Date().toISOString(),
        Status: 'Active',
        Notes: notes
      };
      memoryDb.sevathonVisitors.unshift(newVisitor);

      return res.status(201).json({
        success: true,
        message: 'Thank you for visiting our YouthAIF booth at Sevathon 9/20! (Saved to Data Store)',
        visitor: {
          id: newVisitor.VisitorID,
          fullName,
          email,
          visitorType,
          qrCode: newVisitor.QRCheckinCode,
          registeredAt: newVisitor.RegisteredAt
        }
      });
    }
  } catch (err) {
    console.error('Error in Sevathon Checkin API:', err);
    res.status(500).json({ success: false, message: 'Server error processing booth registration.', error: err.message });
  }
});

// GET /api/sevathon/visitors - List visitors
router.get('/visitors', async (req, res) => {
  try {
    if (isSqlServerActive()) {
      const pool = getPool();
      const result = await pool.request().query('SELECT * FROM dbo.SevathonVisitors ORDER BY RegisteredAt DESC');
      return res.json({ success: true, count: result.recordset.length, visitors: result.recordset });
    } else {
      const memoryDb = getMemoryDb();
      return res.json({ success: true, count: memoryDb.sevathonVisitors.length, visitors: memoryDb.sevathonVisitors });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving visitors.', error: err.message });
  }
});

// GET /api/sevathon/stats - Analytics summary
router.get('/stats', async (req, res) => {
  try {
    if (isSqlServerActive()) {
      const pool = getPool();
      const result = await pool.request().query('SELECT * FROM dbo.vw_SevathonVisitorSummary');
      return res.json({ success: true, stats: result.recordset[0] });
    } else {
      const visitors = getMemoryDb().sevathonVisitors;
      const stats = {
        TotalVisitors: visitors.length,
        YouthCount: visitors.filter(v => v.VisitorType.includes('Youth')).length,
        ParentCount: visitors.filter(v => v.VisitorType === 'Parent').length,
        EducatorCount: visitors.filter(v => v.VisitorType === 'Educator').length,
        VolunteerCount: visitors.filter(v => v.VisitorType === 'Volunteer').length,
        CorporateCount: visitors.filter(v => v.VisitorType === 'Corporate').length,
        NewsletterSubscribers: visitors.filter(v => v.NewsletterOptIn).length,
        RaffleParticipants: visitors.filter(v => v.EnteredRaffle).length
      };
      return res.json({ success: true, stats });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching stats.', error: err.message });
  }
});

module.exports = router;
