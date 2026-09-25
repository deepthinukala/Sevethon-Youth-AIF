import React from 'react';
import { Sparkles, Globe, BookOpen, Users, Mail, Compass, Award } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', label: 'Overview & Mission', icon: Compass },
    { id: 'sevathon', label: '🎯 Sevathon 9/20 Booth', icon: Sparkles, highlight: true },
    { id: 'skilling', label: 'Youth Skilling & AI', icon: BookOpen },
    { id: 'hubs', label: 'Community Hubs', icon: Users },
    { id: 'contact', label: 'Contact & Newsletter', icon: Mail }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(5, 36, 64, 0.96)',
      backdropFilter: 'blur(12px)',
      borderBottom: '2px solid rgba(240, 90, 40, 0.3)',
      color: '#FFFFFF'
    }}>
      {/* Top Banner Tagline */}
      <div style={{
        backgroundColor: '#F05A28',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: '0.4rem 1rem',
        fontSize: '0.85rem',
        fontWeight: '600',
        letterSpacing: '0.02em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <Award size={16} />
        <span>A Public–Private–Youth Partnership for a <strong>#WorkLifeReady Generation</strong></span>
        <span style={{ margin: '0 0.5rem', opacity: 0.7 }}>|</span>
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setActiveTab('sevathon')}>
          Visit Our Booth at Sevathon 9/20 ➔
        </span>
      </div>

      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.85rem',
        paddingBottom: '0.85rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Logo Brand */}
        <div 
          onClick={() => setActiveTab('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #F05A28 0%, #F4AB25 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: '800',
            fontSize: '1.4rem',
            boxShadow: '0 4px 12px rgba(240, 90, 40, 0.4)'
          }}>
            Y
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#FFFFFF' }}>Youth</span>
              <span style={{ fontSize: '1.6rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#F05A28' }}>AIF</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: '500', marginTop: '-4px' }}>
              Youth Advancement Incubator Foundation
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.6rem 1.1rem',
                  borderRadius: '10px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#FFFFFF' : tab.highlight ? '#F4AB25' : '#CBD5E1',
                  backgroundColor: isActive 
                    ? tab.highlight ? '#F05A28' : 'rgba(255, 255, 255, 0.15)' 
                    : tab.highlight ? 'rgba(240, 90, 40, 0.18)' : 'transparent',
                  border: tab.highlight 
                    ? '1px solid rgba(240, 90, 40, 0.6)' 
                    : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive && tab.highlight ? '0 0 15px rgba(240, 90, 40, 0.5)' : 'none'
                }}
              >
                <Icon size={17} style={{ color: isActive ? '#FFFFFF' : tab.highlight ? '#F05A28' : '#94A3B8' }} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
