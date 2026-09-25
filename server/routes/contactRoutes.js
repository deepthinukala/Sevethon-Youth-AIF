const express = require('express');
const router = express.Router();
const { getPool, isSqlServerActive, getMemoryDb, sql } = require('../config/db');

// POST /api/contact/newsletter - Subscribe to newsletter
router.post('/newsletter', async (req, res) => {
  try {
    const { email, newsletterName = 'Both' } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    if (isSqlServerActive()) {
      const pool = getPool();
      await pool.request()
        .input('Email', sql.NVarChar(150), email)
        .input('NewsletterName', sql.NVarChar(100), newsletterName)
        .query(`
          IF NOT EXISTS (SELECT 1 FROM dbo.NewsletterSubscriptions WHERE Email = @Email)
          BEGIN
              INSERT INTO dbo.NewsletterSubscriptions (Email, NewsletterName) VALUES (@Email, @NewsletterName);
          END
        `);
    } else {
      const db = getMemoryDb();
      if (!db.newsletterSubscriptions.find(s => s.Email === email)) {
        db.newsletterSubscriptions.push({
          SubscriptionID: db.newsletterSubscriptions.length + 1,
          Email: email,
          NewsletterName: newsletterName,
          SubscribedAt: new Date().toISOString()
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: `Successfully subscribed ${email} to ${newsletterName} newsletter!`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Newsletter subscription failed.', error: err.message });
  }
});

// POST /api/contact/message - Send contact inquiry
router.post('/message', async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;
    if (!fullName || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    if (isSqlServerActive()) {
      const pool = getPool();
      await pool.request()
        .input('FullName', sql.NVarChar(100), fullName)
        .input('Email', sql.NVarChar(150), email)
        .input('Subject', sql.NVarChar(200), subject || 'General Inquiry')
        .input('Message', sql.NVarChar(sql.MAX), message)
        .query(`
          INSERT INTO dbo.ContactInquiries (FullName, Email, Subject, Message)
          VALUES (@FullName, @Email, @Subject, @Message)
        `);
    } else {
      const db = getMemoryDb();
      db.contactInquiries.push({
        InquiryID: db.contactInquiries.length + 1,
        FullName: fullName,
        Email: email,
        Subject: subject || 'General Inquiry',
        Message: message,
        SubmittedAt: new Date().toISOString(),
        Status: 'Pending'
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent to Ranjan Desai & the YouthAIF team.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send message.', error: err.message });
  }
});

module.exports = router;
