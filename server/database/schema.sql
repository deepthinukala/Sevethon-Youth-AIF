-- ============================================================================
-- YouthAIF (Youth Advancement Incubator Foundation) - Database Schema
-- Target RDBMS: Microsoft SQL Server (2019 / 2022 / Azure SQL Database)
-- Purpose: Supports YouthAIF Web Application & Sevathon 9/20 Booth Visitor Tracking
-- ============================================================================

-- 1. Create Database (Run if database does not exist)
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'YouthAIFDB')
BEGIN
    CREATE DATABASE YouthAIFDB;
END
GO

USE YouthAIFDB;
GO

-- 2. Sevathon 9/20 Booth Visitors Table
IF OBJECT_ID('dbo.SevathonVisitors', 'U') IS NOT NULL
    DROP TABLE dbo.SevathonVisitors;
GO

CREATE TABLE dbo.SevathonVisitors (
    VisitorID INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL,
    Phone NVARCHAR(30) NULL,
    VisitorType NVARCHAR(50) NOT NULL DEFAULT 'Visitor', -- Youth (10-18), Parent, Educator, Volunteer, Corporate
    InterestAreas NVARCHAR(MAX) NULL, -- JSON array or comma separated: e.g. "AI,Python,Vibe Coding,Ambassador"
    AgeGroup NVARCHAR(30) NULL, -- 10-14, 15-18, 19-25, 25+
    EnteredRaffle BIT NOT NULL DEFAULT 1,
    NewsletterOptIn BIT NOT NULL DEFAULT 1,
    QRCheckinCode NVARCHAR(50) NOT NULL UNIQUE DEFAULT NEWID(),
    CheckinSource NVARCHAR(50) NOT NULL DEFAULT 'Sevathon 9/20 Booth',
    RegisteredAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    Status NVARCHAR(30) NOT NULL DEFAULT 'Active',
    Notes NVARCHAR(MAX) NULL
);
GO

CREATE INDEX IX_SevathonVisitors_Email ON dbo.SevathonVisitors(Email);
CREATE INDEX IX_SevathonVisitors_VisitorType ON dbo.SevathonVisitors(VisitorType);
CREATE INDEX IX_SevathonVisitors_RegisteredAt ON dbo.SevathonVisitors(RegisteredAt DESC);
GO

-- 3. Skilling & Incubator Programs Table
IF OBJECT_ID('dbo.Programs', 'U') IS NOT NULL
    DROP TABLE dbo.Programs;
GO

CREATE TABLE dbo.Programs (
    ProgramID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(150) NOT NULL,
    Category NVARCHAR(50) NOT NULL, -- Language, AI & Hackathons, Leadership, Community Hub
    Description NVARCHAR(MAX) NOT NULL,
    TargetAgeGroup NVARCHAR(50) NOT NULL DEFAULT 'Ages 10-25+',
    IconKey NVARCHAR(50) NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
);
GO

-- 4. Newsletter Subscriptions Table
IF OBJECT_ID('dbo.NewsletterSubscriptions', 'U') IS NOT NULL
    DROP TABLE dbo.NewsletterSubscriptions;
GO

CREATE TABLE dbo.NewsletterSubscriptions (
    SubscriptionID INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    NewsletterName NVARCHAR(100) NOT NULL, -- 'NAM Mindfulness' or 'Journey of Starting a Company' or 'Both'
    SubscribedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    IsActive BIT NOT NULL DEFAULT 1
);
GO

-- 5. General Contact & Inquiry Messages Table
IF OBJECT_ID('dbo.ContactInquiries', 'U') IS NOT NULL
    DROP TABLE dbo.ContactInquiries;
GO

CREATE TABLE dbo.ContactInquiries (
    InquiryID INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL,
    Subject NVARCHAR(200) NULL,
    Message NVARCHAR(MAX) NOT NULL,
    SubmittedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    Status NVARCHAR(30) NOT NULL DEFAULT 'Pending'
);
GO

-- 6. Stored Procedure: Register Sevathon Visitor
IF OBJECT_ID('dbo.sp_RegisterSevathonVisitor', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_RegisterSevathonVisitor;
GO

CREATE PROCEDURE dbo.sp_RegisterSevathonVisitor
    @FullName NVARCHAR(100),
    @Email NVARCHAR(150),
    @Phone NVARCHAR(30) = NULL,
    @VisitorType NVARCHAR(50) = 'Visitor',
    @InterestAreas NVARCHAR(MAX) = NULL,
    @AgeGroup NVARCHAR(30) = NULL,
    @EnteredRaffle BIT = 1,
    @NewsletterOptIn BIT = 1,
    @Notes NVARCHAR(MAX) = NULL,
    @NewVisitorID INT OUTPUT,
    @QRCode NVARCHAR(50) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    SET @QRCode = NEWID();

    INSERT INTO dbo.SevathonVisitors (
        FullName, Email, Phone, VisitorType, InterestAreas, AgeGroup, EnteredRaffle, NewsletterOptIn, QRCheckinCode, Notes
    )
    VALUES (
        @FullName, @Email, @Phone, @VisitorType, @InterestAreas, @AgeGroup, @EnteredRaffle, @NewsletterOptIn, @QRCode, @Notes
    );

    SET @NewVisitorID = SCOPE_IDENTITY();
END;
GO

-- 7. View: Sevathon Booth Analytics Summary
IF OBJECT_ID('dbo.vw_SevathonVisitorSummary', 'V') IS NOT NULL
    DROP VIEW dbo.vw_SevathonVisitorSummary;
GO

CREATE VIEW dbo.vw_SevathonVisitorSummary AS
SELECT 
    COUNT(*) AS TotalVisitors,
    SUM(CASE WHEN VisitorType = 'Youth (10-18)' THEN 1 ELSE 0 END) AS YouthCount,
    SUM(CASE WHEN VisitorType = 'Parent' THEN 1 ELSE 0 END) AS ParentCount,
    SUM(CASE WHEN VisitorType = 'Educator' THEN 1 ELSE 0 END) AS EducatorCount,
    SUM(CASE WHEN VisitorType = 'Volunteer' THEN 1 ELSE 0 END) AS VolunteerCount,
    SUM(CASE WHEN VisitorType = 'Corporate' THEN 1 ELSE 0 END) AS CorporateCount,
    SUM(CASE WHEN NewsletterOptIn = 1 THEN 1 ELSE 0 END) AS NewsletterSubscribers,
    SUM(CASE WHEN EnteredRaffle = 1 THEN 1 ELSE 0 END) AS RaffleParticipants
FROM dbo.SevathonVisitors;
GO

-- 8. Seed Initial Data (Matching Flyer Details)
INSERT INTO dbo.Programs (Title, Category, Description, TargetAgeGroup, IconKey)
VALUES 
('Learn Languages (Python, Sanskrit, Spanish)', 'Youth-Led Skilling', 'Polyglot coding & traditional/modern language fluency for global tech & cultural opportunities.', 'Ages 10-25+', 'Code'),
('AI Courses, Hackathons & Digital Creativity', 'Youth-Led Skilling', 'Hands-on AI model building, generative AI artwork, vibe coding, and innovation hackathons.', 'Ages 10-25+', 'Brain'),
('Leadership, Business Skills & Social Media Presence', 'Youth-Led Skilling', 'Building public speaking confidence, digital storytelling, entrepreneurship, and personal brand.', 'Ages 12-25+', 'Award'),
('Web Creation & Vibe Coding', 'Youth-Led Skilling', 'Fast-paced web app assembly using AI coding tools, modern JS, React, and modern UI stack.', 'Ages 12-25+', 'Globe'),
('Internships & Job Pathways', 'Youth-Led Skilling', 'Connecting certified youth graduates directly to startups, NGOs, and enterprise corporate partners.', 'Ages 16-25+', 'Briefcase'),
('Community-Powered Hubs (80-20 Model)', 'Community Hubs', 'Neighborhood-rooted hubs funded by 80-20 scholarship models to ensure self-sustaining youth action.', 'All Ages', 'Users');

-- Sample Sevathon 9/20 Booth Visitors
INSERT INTO dbo.SevathonVisitors (FullName, Email, Phone, VisitorType, InterestAreas, AgeGroup, EnteredRaffle, NewsletterOptIn, Notes)
VALUES
('Aarav Patel', 'aarav.p@example.com', '+1 (408) 555-0192', 'Youth (10-18)', 'AI courses, Hackathons, Python', '15-18', 1, 1, 'Interested in Youth Ambassador role'),
('Priya Sharma', 'priya.sharma@example.org', '+1 (650) 555-0183', 'Parent', 'Sanskrit, Leadership, Psycho-social support', '25+', 1, 1, 'Mother of 2 teenagers interested in local hub'),
('Michael Chang', 'm.chang@techpartner.com', '+1 (415) 555-0144', 'Corporate', 'Internships & Job Pathways, Mentorship', '25+', 0, 1, 'Wants to sponsor hackathon prizes'),
('Ananya Gupta', 'ananya.g@univ.edu', '+1 (408) 555-0177', 'Youth (10-18)', 'Vibe coding, Web creation, Spanish', '19-25', 1, 1, 'Wants to start hub at local college');

GO

PRINT 'YouthAIF SQL Server Schema Created Successfully.';
