const express = require('express');
const router = express.Router();
const { getPool, isSqlServerActive } = require('../config/db');

const defaultPrograms = [
  {
    ProgramID: 1,
    Title: 'Youth-Led Skilling & Leadership',
    Category: 'Skilling',
    Description: 'Languages (Python, Sanskrit, Spanish), AI courses, hackathons, vibe coding, web creation, leadership, business skills, social media presence, and internships.',
    TargetAgeGroup: 'Ages 10-25+',
    IconKey: 'Brain',
    Highlights: [
      'Learn Languages: Python, Sanskrit, Spanish',
      'AI courses & digital creativity hackathons',
      'Leadership & business skills',
      'Web creation & Vibe coding with AI tools',
      'Internships & job pathways for youth graduates'
    ]
  },
  {
    ProgramID: 2,
    Title: 'Community-Powered Hubs',
    Category: 'Hubs',
    Description: 'Local hubs driven by volunteers from schools, companies, and neighborhoods, offering psycho-social support, humanitarian youth action, and fundraising booths.',
    TargetAgeGroup: 'All Ages',
    IconKey: 'Users',
    Highlights: [
      'Volunteers from schools & neighborhoods',
      'Psycho-social support & youth action',
      'Fundraising events & youth-led booths',
      'Self-sustaining 80-20 scholarship model',
      'Global opportunities for US & worldwide youth'
    ]
  },
  {
    ProgramID: 3,
    Title: 'Sevathon 9/20 Booth & Community Outreach',
    Category: 'Events',
    Description: 'Interactive booth at Sevathon 9/20 showcasing youth-led AI demos, vibe coding showcases, raffle entry, and Youth Ambassador registration.',
    TargetAgeGroup: 'Community & Youth',
    IconKey: 'Sparkles',
    Highlights: [
      'Live AI & Vibe Coding Demos',
      'Youth Ambassador Sign-up',
      'Special Sevathon Raffle & Swag',
      'Networking with Industry Mentors'
    ]
  }
];

// GET /api/programs - List all YouthAIF programs
router.get('/', async (req, res) => {
  try {
    if (isSqlServerActive()) {
      const pool = getPool();
      const result = await pool.request().query('SELECT * FROM dbo.Programs WHERE IsActive = 1');
      return res.json({ success: true, programs: result.recordset });
    } else {
      return res.json({ success: true, programs: defaultPrograms });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving programs.', error: err.message });
  }
});

module.exports = router;
