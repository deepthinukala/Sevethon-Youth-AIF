# YouthAIF Web Application & Sevathon 9/20 Booth Visitor Portal

> **Youth Advancement Incubator Foundation (YouthAIF)**  
> *A Public–Private–Youth Partnership for a #WorkLifeReady Generation*  
> Tagline: *"Creating Opportunities. Building Futures."*  
> Website: [https://www.YouthAIF.org](https://www.YouthAIF.org)

---

## 🌟 Overview

This full-stack web application is built for **YouthAIF (Youth Advancement Incubator Foundation)** with a dedicated interactive portal tab designed specifically for visitors attending the **YouthAIF Booth at the Sevathon Event on September 20th**.

The system enables event visitors (youth ages 10-25+, parents, educators, volunteers, and corporate partners) to:
1. **Check in at the Sevathon 9/20 Booth** via an interactive registration form.
2. **Enter the Sevathon 9/20 Raffle** for YouthAIF Vibe Coding bootcamp scholarships, mentorship sessions, and swag.
3. **Generate an Instant VIP Visitor Badge with Unique QR Code** (`QR-SEV-XXXX`).
4. **Subscribe to YouthAIF Publications** (*NAM Mindfulness* and *Journey of Starting a Company*).
5. **View Live Visitor Directories & Analytics** powered by a **Node.js Express API** connected to a **Microsoft SQL Server Database**.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
|---|---|---|
| **Frontend Framework** | React.js (v19) + Vite | Fast SPA with smooth tab routing & glassmorphism UI |
| **Language** | Modern JavaScript (ES6+) | Full-stack JS implementation |
| **Backend API** | Node.js + Express.js | RESTful API server running on port `5000` |
| **Database Engine** | Microsoft SQL Server (MSSQL) | Native SQL Server database driver (`mssql` npm package) |
| **Database Sync** | SQL Schema DDL + Sync Fallback | Pre-seeded SQL schema script + zero-config preview store |
| **UI & Styling** | Vanilla CSS3 + Custom Design Tokens | Custom design system matching YouthAIF flyer color scheme |
| **Icons & Effects** | Lucide React + Canvas Confetti | Modern UI icons & celebratory interactive submission animations |

---

## 📁 Repository Structure

```
youth AIF JS/
├── client/                     # React.js Frontend Application
│   ├── public/                 # Static assets & favicons
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Sticky navigation header & tab switcher
│   │   │   ├── Footer.jsx      # Footer with flyer contact info & newsletters
│   │   │   ├── SevathonBoothTab.jsx # 🎯 Dedicated Sevathon 9/20 Booth Tab & QR Badge
│   │   │   ├── HomeTab.jsx     # Overview, Mission, "What We Do", "Why Now"
│   │   │   ├── SkillingTab.jsx # Python, Sanskrit, Spanish, AI, Vibe Coding
│   │   │   ├── HubsTab.jsx     # Community Hubs (80-20 Scholarship Model)
│   │   │   ├── ContactTab.jsx  # Direct founder message form & newsletter sign-up
│   │   │   └── SocialIcons.jsx # Custom SVG icons for LinkedIn & YouTube
│   │   ├── App.jsx             # Main application layout & tab router
│   │   ├── index.css           # Global design system tokens & glassmorphism CSS
│   │   └── main.jsx            # React root entry point
│   ├── index.html              # HTML5 template with SEO meta tags & fonts
│   └── package.json            # Frontend dependencies (React, Lucide, Vite)
│
├── server/                     # Node.js + Express Backend API
│   ├── config/
│   │   └── db.js               # Microsoft SQL Server connection pool (mssql)
│   ├── database/
│   │   └── schema.sql          # SQL Server DDL DML Script (Tables, Views, SPs)
│   ├── routes/
│   │   ├── sevathonRoutes.js   # Booth check-in, visitor directory & stats APIs
│   │   ├── programRoutes.js    # Youth skilling catalog endpoints
│   │   └── contactRoutes.js    # Newsletter subscriptions & founder messages
│   ├── .env                    # Database credentials & server configuration
│   ├── index.js                # Express app entry point (Port 5000)
│   └── package.json            # Backend dependencies (express, mssql, cors, dotenv)
│
└── README.md                   # Complete reference & setup documentation
```

---

## 🛢️ SQL Server Database Configuration

The application includes a complete Microsoft SQL Server database script located at [`server/database/schema.sql`](file:///d:/AI%20projects/youth%20AIF%20JS/server/database/schema.sql).

### Database Schema Tables
- **`dbo.SevathonVisitors`**: Stores visitor check-ins from the 9/20 Sevathon booth (Full Name, Email, Phone, Role, Age Group, Interest Areas, Raffle Status, Newsletter Opt-in, QR Check-in Code, Timestamp).
- **`dbo.Programs`**: Catalog of Youth-Led Skilling & Leadership courses (Python, Sanskrit, Spanish, AI, Vibe Coding, Hubs).
- **`dbo.NewsletterSubscriptions`**: Subscription records for *NAM Mindfulness* and *Journey of Starting a Company*.
- **`dbo.ContactInquiries`**: Direct messages submitted to Founder Ranjan Desai.
- **`dbo.vw_SevathonVisitorSummary`**: SQL Analytics View calculating real-time event totals.
- **`dbo.sp_RegisterSevathonVisitor`**: Stored procedure for inserting booth visitors and outputting unique QR check-in tokens.

### How to Run the SQL Script in SQL Server Management Studio (SSMS) or `sqlcmd`:
```bash
sqlcmd -S localhost -U sa -P "YourPassword" -i server/database/schema.sql
```

### Environment Setup (`server/.env`)
Create or edit `server/.env` with your SQL Server connection details:
```env
PORT=5000
DB_SERVER=localhost
DB_NAME=YouthAIFDB
DB_USER=sa
DB_PASSWORD=YourStrong@Password123
DB_PORT=1433
DB_ENCRYPT=false
```

*Note: If local SQL Server is offline or unreachable, the server automatically operates in **Data Sync Preview Mode** with pre-populated seed data so you can test the full UI without interruption!*

---

## 🚀 Quick Start & Execution Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher (`node -v`)
- **npm**: v9.0.0 or higher (`npm -v`)

### 1. Start the Node.js API Server
Open a terminal window and execute:
```bash
cd server
npm install
npm start
```
*The server will start at `http://localhost:5000/api`*

### 2. Start the React Frontend Application
Open a second terminal window and execute:
```bash
cd client
npm install
npm run dev
```
*The React application will launch at `http://localhost:3000/`*

---

## 📡 API Endpoint Reference

### 🎯 Sevathon 9/20 Booth Endpoints
- **`POST /api/sevathon/checkin`**: Submit a new booth visitor registration.
  - *Payload*: `{ fullName, email, phone, visitorType, interestAreas, ageGroup, enteredRaffle, newsletterOptIn, notes }`
- **`GET /api/sevathon/visitors`**: Retrieve all registered booth visitors (queries SQL Server `dbo.SevathonVisitors`).
- **`GET /api/sevathon/stats`**: Get real-time event statistics (Total visitors, Youth count, Raffle entries).

### 📬 Contact & Newsletter Endpoints
- **`POST /api/contact/newsletter`**: Subscribe to *NAM Mindfulness* or *Journey of Starting a Company*.
- **`POST /api/contact/message`**: Send a message to Founder Ranjan Desai.
- **`GET /api/programs`**: List all YouthAIF skilling offerings.
- **`GET /api/health`**: System health check & database connection status.

---

## 📞 YouthAIF Contact & Founder Details

- **Founder**: Ranjan Desai
- **Website**: [https://www.YouthAIF.org](https://www.YouthAIF.org)
- **LinkedIn**: [https://www.linkedin.com/in/desairanjan](https://www.linkedin.com/in/desairanjan)
- **YouTube**: [@nam-mindfulness](https://youtube.com/@nam-mindfulness)
- **WhatsApp / Cell**: `+1 (408) 483-3082`
- **Email**: `ranjan@hubhaya.com`
- **Publications**: *NAM Mindfulness* & *Journey of Starting a Company*

---

*Community-Powered Hubs That Create Opportunity, Not Dependency and Not just Training.*
