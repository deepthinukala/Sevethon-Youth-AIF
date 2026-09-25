import React from 'react';
import { Users, Shield, Heart, Globe, Award, CheckCircle } from 'lucide-react';

export default function HubsTab({ setActiveTab }) {
  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>COMMUNITY-POWERED HUBS</span>
          <h1 style={{ fontSize: '2.5rem', color: '#052440', fontWeight: '800' }}>
            Local Hubs Creating Real Opportunity
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#64748B', maxWidth: '750px', margin: '0.75rem auto 0' }}>
            "Creating Opportunity, Not Dependency and Not just Training"
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid-2" style={{ marginBottom: '3rem' }}>
          <div className="glass-card" style={{ padding: '2.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(58, 150, 88, 0.15)', padding: '0.75rem', borderRadius: '12px', color: '#3A9658' }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: '#052440' }}>Volunteer-Led & Neighborhood Rooted</h3>
            </div>
            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', marginBottom: '1rem' }}>
              Our hubs bring together passionate volunteers from schools, companies, and local neighborhoods to mentor youth in safe, supportive environments.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: '#334155' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#3A9658" /> Psycho-social support & holistic well-being
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#3A9658" /> Humanitarian youth action & civic service
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#3A9658" /> Youth-led fundraising booths & hackathons
              </li>
            </ul>
          </div>

          <div className="glass-card" style={{ padding: '2.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(240, 90, 40, 0.15)', padding: '0.75rem', borderRadius: '12px', color: '#F05A28' }}>
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: '#052440' }}>Self-Sustaining 80–20 Scholarship Model</h3>
            </div>
            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', marginBottom: '1rem' }}>
              We ensure sustainability and equity: 80% scholarship coverage for underprivileged students paired with 20% community stake to build pride and accountability.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: '#334155' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#F05A28" /> Equal access regardless of socioeconomic background
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#F05A28" /> Corporate sponsorship & matching grants
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#F05A28" /> Replicable model across USA and international chapters
              </li>
            </ul>
          </div>
        </div>

        {/* Global Scaling Map Callout */}
        <div style={{
          background: 'linear-gradient(135deg, #052440 0%, #184A78 100%)',
          borderRadius: '20px',
          padding: '2.5rem',
          color: '#FFFFFF',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <div>
            <span className="badge badge-amber" style={{ marginBottom: '0.75rem' }}>START LOCAL ➔ SCALE GLOBAL</span>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>
              Bringing Global Opportunities to Youth Everywhere
            </h2>
            <p style={{ fontSize: '0.98rem', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              From neighborhood school clubs to international youth ambassador chapters, YouthAIF establishes a standardized blueprint that any school, community center, or non-profit can deploy.
            </p>
            <button onClick={() => setActiveTab('sevathon')} className="btn btn-primary">
              Become a Youth Ambassador at Sevathon Booth ➔
            </button>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.08)',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.15)',
            textAlign: 'center'
          }}>
            <Globe size={80} color="#F4AB25" style={{ margin: '0 auto 1rem' }} />
            <h4 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '0.5rem' }}>Global Ambassador Network</h4>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8' }}>
              Connecting US youth with international peers for collaborative AI hackathons and language exchanges (Python, Sanskrit, Spanish).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
