import React from 'react';
import { Phone, Mail, Globe, Heart, QrCode } from 'lucide-react';
import { LinkedinIcon, YoutubeIcon } from './SocialIcons';

export default function Footer({ setActiveTab }) {
  return (
    <footer style={{
      backgroundColor: '#031628',
      color: '#E2E8F0',
      paddingTop: '3.5rem',
      paddingBottom: '2rem',
      borderTop: '3px solid #F05A28',
      marginTop: '4rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Column 1: Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #F05A28 0%, #F4AB25 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '1.2rem'
              }}>Y</div>
              <div>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FFFFFF' }}>Youth</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#F05A28' }}>AIF</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '1.25rem', lineHeight: '1.6' }}>
              Youth Advancement Incubator Foundation — A Public–Private–Youth Partnership empowering 1.2 billion young people (ages 10-25+) for a #WorkLifeReady Generation.
            </p>
            <div style={{
              background: 'rgba(240, 90, 40, 0.15)',
              borderLeft: '4px solid #F05A28',
              padding: '0.75rem 1rem',
              borderRadius: '0 8px 8px 0',
              fontSize: '0.85rem',
              color: '#F4AB25',
              fontStyle: 'italic',
              fontWeight: '600'
            }}>
              "Over 1 billion futures are on the line."
            </div>
          </div>

          {/* Column 2: Newsletters & Mindset */}
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '1.25rem', fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
              STAY CONNECTED — NEWSLETTERS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.85rem', borderRadius: '10px' }}>
                <div style={{ fontWeight: '700', color: '#F4AB25', fontSize: '0.92rem', marginBottom: '0.2rem' }}>
                  🌱 NAM Mindfulness
                </div>
                <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                  Ancient wisdom for modern life & youth focus
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.85rem', borderRadius: '10px' }}>
                <div style={{ fontWeight: '700', color: '#F05A28', fontSize: '0.92rem', marginBottom: '0.2rem' }}>
                  🚀 Journey of Starting a Company
                </div>
                <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                  Founder insights, entrepreneurship & vibe coding
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '1.25rem', fontSize: '1.1rem' }}>
              GET IN TOUCH
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>
                <a href="https://www.linkedin.com/in/desairanjan" target="_blank" rel="noreferrer" style={{ color: '#CBD5E1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <LinkedinIcon size={18} color="#0A66C2" /> LinkedIn: desairanjan
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@nam-mindfulness" target="_blank" rel="noreferrer" style={{ color: '#CBD5E1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <YoutubeIcon size={18} color="#FF0000" /> YouTube: @nam-mindfulness
                </a>
              </li>
              <li>
                <a href="tel:+14084833082" style={{ color: '#CBD5E1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Phone size={18} color="#25D366" /> WhatsApp / Cell: +1 (408) 483-3082
                </a>
              </li>
              <li>
                <a href="mailto:ranjan@hubhaya.com" style={{ color: '#CBD5E1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Mail size={18} color="#F05A28" /> Email: ranjan@hubhaya.com
                </a>
              </li>
              <li>
                <a href="https://www.YouthAIF.org" target="_blank" rel="noreferrer" style={{ color: '#F4AB25', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Globe size={18} color="#F4AB25" /> Web: www.YouthAIF.org
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Sevathon Booth & Tagline */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(240, 90, 40, 0.2)' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '800', color: '#F4AB25', marginBottom: '0.5rem' }}>
              Creating Opportunities.<br/>Building Futures.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.8rem 0' }}>
              <QrCode size={40} color="#F05A28" />
              <div style={{ textAlign: 'left', fontSize: '0.78rem', color: '#CBD5E1' }}>
                <strong>Sevathon 9/20 Booth</strong><br/>
                Scan or Click tab for fast visitor check-in & raffle!
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('sevathon')}
              className="btn btn-primary"
              style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              Sevathon Booth Check-in
            </button>
          </div>
        </div>

        {/* Bottom Banner */}
        <div style={{
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#94A3B8'
        }}>
          <div>
            Community-Powered Hubs That Create Opportunity, Not Dependency and Not just Training.
          </div>
          <div>
            © 2026 YouthAIF. All Rights Reserved. Built with React.js, Node.js & SQL Server.
          </div>
        </div>
      </div>
    </footer>
  );
}
