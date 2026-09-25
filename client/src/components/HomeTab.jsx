import React from 'react';
import { 
  Rocket, Target, Zap, Globe, Shield, Sparkles, CheckCircle2, 
  ArrowRight, HeartHandshake, BookOpen, Award, Users 
} from 'lucide-react';

export default function HomeTab({ setActiveTab }) {
  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="container">
        {/* HERO SECTION */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '2.5rem',
          alignItems: 'center',
          marginBottom: '3.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span className="badge badge-coral">#WorkLifeReady Generation</span>
              <span className="badge badge-amber">Public–Private–Youth Partnership</span>
            </div>

            <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#052440', lineHeight: '1.15', marginBottom: '1.25rem' }}>
              Youth Advancement Incubator <span style={{ color: '#F05A28' }}>Foundation</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: '1.6', marginBottom: '1.75rem' }}>
              Empowering <strong>1.2 billion young people (ages 10–25+)</strong> with skills, employment pathways, and entrepreneurship opportunities in green, digital, and AI-driven economies.
            </p>

            {/* Three Partnership Pills */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div style={{ background: '#FFFFFF', padding: '0.6rem 1.25rem', borderRadius: '99px', boxShadow: 'var(--shadow-sm)', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: '#052440' }}>
                <Shield size={18} color="#052440" /> Companies
              </div>
              <div style={{ background: '#FFFFFF', padding: '0.6rem 1.25rem', borderRadius: '99px', boxShadow: 'var(--shadow-sm)', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: '#052440' }}>
                <HeartHandshake size={18} color="#F05A28" /> Parents
              </div>
              <div style={{ background: '#FFFFFF', padding: '0.6rem 1.25rem', borderRadius: '99px', boxShadow: 'var(--shadow-sm)', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: '#052440' }}>
                <Users size={18} color="#3A9658" /> Youth Partnership
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setActiveTab('sevathon')} 
                className="btn btn-primary"
                style={{ fontSize: '1.05rem', padding: '0.85rem 1.75rem' }}
              >
                🎯 Sevathon 9/20 Booth Visitor Tab
              </button>
              <button 
                onClick={() => setActiveTab('skilling')} 
                className="btn btn-outline"
                style={{ fontSize: '1.05rem', padding: '0.85rem 1.75rem' }}
              >
                Explore Youth Skilling Programs
              </button>
            </div>
          </div>

          {/* Right Hero Card - Mission Spotlight */}
          <div className="glass-card-dark" style={{ padding: '2.5rem', position: 'relative' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: '#F05A28',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 14px rgba(240, 90, 40, 0.4)'
            }}>
              <Target size={34} color="#FFF" />
            </div>

            <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>OUR MISSION</h3>
            <p style={{ fontSize: '1rem', color: '#E2E8F0', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Empowering young people with skills, employment pathways, and entrepreneurship in <strong>green</strong>, <strong>digital</strong>, and <strong>AI-driven</strong> economies.
            </p>

            <div style={{
              background: 'rgba(244, 171, 37, 0.15)',
              borderLeft: '4px solid #F4AB25',
              padding: '1rem',
              borderRadius: '0 8px 8px 0',
              color: '#F4AB25',
              fontSize: '1.05rem',
              fontStyle: 'italic',
              fontWeight: '700'
            }}>
              "Over 1 billion futures are on the line."
            </div>
          </div>
        </div>

        {/* SECTION 2: WHAT WE DO */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>WHAT WE DO</span>
            <h2 style={{ fontSize: '2.2rem', color: '#052440' }}>Two Core Pillars Driving Youth Impact</h2>
          </div>

          <div className="grid-2">
            {/* Card 1: Skilling */}
            <div className="glass-card" style={{ padding: '2.25rem', borderTop: '5px solid #F05A28' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <BookOpen size={30} color="#F05A28" />
                <h3 style={{ fontSize: '1.4rem', color: '#052440' }}>YOUTH-LED SKILLING & LEADERSHIP</h3>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.98rem', color: '#334155' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={20} color="#F05A28" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Learn Languages:</strong> Python, Sanskrit, Spanish</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={20} color="#F05A28" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>AI courses</strong>, hackathons, digital creativity</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={20} color="#F05A28" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Leadership</strong>, business skills, social media presence</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={20} color="#F05A28" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Web creation</strong>, Vibe coding, digital tools</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={20} color="#F05A28" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Internships & job pathways</strong> for youth graduates</span>
                </li>
              </ul>

              <button 
                onClick={() => setActiveTab('skilling')} 
                className="btn btn-outline"
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                View Skilling Curriculum ➔
              </button>
            </div>

            {/* Card 2: Community Hubs */}
            <div className="glass-card" style={{ padding: '2.25rem', borderTop: '5px solid #3A9658' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Users size={30} color="#3A9658" />
                <h3 style={{ fontSize: '1.4rem', color: '#052440' }}>COMMUNITY-POWERED HUBS</h3>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.98rem', color: '#334155' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={20} color="#3A9658" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Volunteers</strong> from schools, companies & neighborhoods</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={20} color="#3A9658" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Psycho-social support</strong> & humanitarian youth action</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={20} color="#3A9658" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Fundraising events</strong> & youth-led booths (like Sevathon!)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={20} color="#3A9658" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Self-sustaining hub model</strong> (80-20 scholarships)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={20} color="#3A9658" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Bringing global opportunities</strong> to youth in the USA and worldwide</span>
                </li>
              </ul>

              <button 
                onClick={() => setActiveTab('hubs')} 
                className="btn btn-outline"
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                Learn About Local Hubs ➔
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 3: WHY NOW? & START LOCAL -> SCALE GLOBAL */}
        <div className="grid-2" style={{ marginBottom: '3.5rem' }}>
          {/* Why Now */}
          <div className="glass-card" style={{ padding: '2.25rem', backgroundColor: '#FFFDF9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Rocket size={26} color="#F05A28" />
              <h3 style={{ fontSize: '1.4rem', color: '#052440' }}>WHY NOW?</h3>
            </div>
            <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: '1.6', marginBottom: '1rem' }}>
              The largest generation in history is entering the workforce. AI is transforming jobs faster than ever. Youth need:
            </p>

            <div style={{
              background: '#052440',
              color: '#FFFFFF',
              padding: '1.25rem',
              borderRadius: '12px',
              textAlign: 'center',
              fontWeight: '700',
              fontSize: '1.1rem',
              margin: '1rem 0',
              boxShadow: 'var(--shadow-md)'
            }}>
              real skills <span style={{ color: '#F05A28' }}>➔</span> real jobs <span style={{ color: '#F4AB25' }}>➔</span> real futures
            </div>

            <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
              YouthAIF breaks silos and unites partners to ensure no young person is left behind.
            </p>
          </div>

          {/* Start Local -> Scale Global */}
          <div className="glass-card" style={{ padding: '2.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Globe size={26} color="#052440" />
              <h3 style={{ fontSize: '1.4rem', color: '#052440' }}>START LOCAL ➔ SCALE GLOBAL</h3>
            </div>
            <p style={{ fontSize: '0.98rem', color: '#475569', marginBottom: '1rem' }}>
              Launching YouthAIF across communities with:
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.92rem', color: '#334155' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🏢 Neighborhood schools
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🤝 Local volunteers
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ⭐ Youth ambassadors
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🎪 Community events & booths
              </li>
            </ul>

            <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: 'rgba(58, 150, 88, 0.1)', borderRadius: '10px', fontSize: '0.88rem', color: '#2E7544', fontWeight: '600', textAlign: 'center' }}>
              Building a model that can be replicated globally.
            </div>
          </div>
        </div>

        {/* Bottom Callout Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #F05A28 0%, #D8481A 100%)',
          borderRadius: '16px',
          padding: '2rem',
          color: '#FFFFFF',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            Community-Powered Hubs That Create Opportunity, Not Dependency and Not just Training
          </h3>
          <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '1.25rem' }}>
            Join us at our Sevathon 9/20 Booth or get in touch with Founder Ranjan Desai today.
          </p>
          <button 
            onClick={() => setActiveTab('sevathon')} 
            className="btn btn-navy"
            style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}
          >
            Visit Sevathon 9/20 Booth Tab ➔
          </button>
        </div>
      </div>
    </div>
  );
}
