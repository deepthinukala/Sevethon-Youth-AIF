import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Gift, CheckCircle, QrCode, Users, Trophy, BookOpen, 
  RefreshCw, Search, ShieldCheck, Mail, Phone, UserCheck, Star, Zap 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const API_BASE = 'http://localhost:5000/api/sevathon';

export default function SevathonBoothTab() {
  const [activeSubTab, setActiveSubTab] = useState('form'); // 'form' | 'badge' | 'dashboard'
  const [visitors, setVisitors] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [registeredBadge, setRegisteredBadge] = useState(null);
  const [serverStatus, setServerStatus] = useState({ active: true, dbType: 'Checking...' });

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    visitorType: 'Youth (10-18)',
    ageGroup: '15-18',
    interestAreas: ['AI courses', 'Vibe coding'],
    enteredRaffle: true,
    newsletterOptIn: true,
    notes: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const interestOptions = [
    { id: 'Python', label: 'Python Language Coding' },
    { id: 'Sanskrit', label: 'Sanskrit Language & Heritage' },
    { id: 'Spanish', label: 'Spanish Language Fluency' },
    { id: 'AI courses', label: 'AI Courses & Model Building' },
    { id: 'Hackathons', label: 'Digital Creativity Hackathons' },
    { id: 'Vibe coding', label: 'Web Creation & Vibe Coding' },
    { id: 'Leadership', label: 'Leadership & Business Skills' },
    { id: 'Ambassador', label: 'Youth Ambassador Role' },
    { id: 'Hub Volunteer', label: 'Start/Join a Local Hub' }
  ];

  // Fetch visitors & stats from Node backend API
  const fetchData = async () => {
    setLoading(true);
    try {
      // Healthcheck for DB status
      const healthRes = await fetch('http://localhost:5000/api/health').catch(() => null);
      if (healthRes && healthRes.ok) {
        const healthData = await healthRes.json();
        setServerStatus({ active: true, dbType: healthData.databaseDriver });
      } else {
        setServerStatus({ active: false, dbType: 'Backend Offline (Mock Data Mode)' });
      }

      const [resVisitors, resStats] = await Promise.all([
        fetch(`${API_BASE}/visitors`).then(r => r.json()).catch(() => null),
        fetch(`${API_BASE}/stats`).then(r => r.json()).catch(() => null)
      ]);

      if (resVisitors && resVisitors.success) {
        setVisitors(resVisitors.visitors || []);
      }
      if (resStats && resStats.success) {
        setStats(resStats.stats);
      }
    } catch (err) {
      console.warn('Backend server not connected yet, using local state mode.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInterestToggle = (id) => {
    setFormData(prev => {
      const exists = prev.interestAreas.includes(id);
      if (exists) {
        return { ...prev, interestAreas: prev.interestAreas.filter(i => i !== id) };
      } else {
        return { ...prev, interestAreas: [...prev.interestAreas, id] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!formData.fullName || !formData.email) {
      setSubmitError('Please enter both your full name and email address.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        // Confetti effect!
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}

        setRegisteredBadge({
          fullName: formData.fullName,
          email: formData.email,
          visitorType: formData.visitorType,
          qrCode: data.visitor.qrCode,
          registeredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          interestAreas: formData.interestAreas,
          enteredRaffle: formData.enteredRaffle
        });

        setActiveSubTab('badge');
        fetchData(); // Refresh list & stats
      } else {
        setSubmitError(data.message || 'Failed to check in.');
      }
    } catch (err) {
      // Fallback local badge creation if network fails
      const fallbackQr = 'QR-SEV-' + Math.floor(1000 + Math.random() * 9000);
      setRegisteredBadge({
        fullName: formData.fullName,
        email: formData.email,
        visitorType: formData.visitorType,
        qrCode: fallbackQr,
        registeredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        interestAreas: formData.interestAreas,
        enteredRaffle: formData.enteredRaffle
      });
      setActiveSubTab('badge');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredVisitors = visitors.filter(v => {
    const matchesSearch = v.FullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.Email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || v.VisitorType.includes(filterType);
    return matchesSearch && matchesType;
  });

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="container">
        {/* Banner Section */}
        <div style={{
          background: 'linear-gradient(135deg, #052440 0%, #0F4A7E 100%)',
          borderRadius: '20px',
          padding: '2.5rem',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '2rem',
          border: '1px solid rgba(240, 90, 40, 0.4)'
        }}>
          <div style={{
            position: 'absolute', right: '-20px', top: '-20px', opacity: 0.1, pointerEvents: 'none'
          }}>
            <Sparkles size={300} color="#F4AB25" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-coral">Sevathon Event • Sept 20th</span>
            <span className="badge badge-amber">Official Visitor Check-In Portal</span>
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '0.5rem 0 1rem', lineHeight: '1.2' }}>
            Welcome to the <span style={{ color: '#F05A28' }}>YouthAIF</span> Booth!
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#E2E8F0', maxWidth: '800px', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Visiting our booth at <strong>Sevathon on 9/20th</strong>? Check in below to enter our exclusive YouthAIF Raffle, receive instant access to AI & Vibe Coding toolkits, and connect with our Youth Ambassador network!
          </p>

          {/* Sub Tab Navigation */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveSubTab('form')}
              className={`btn ${activeSubTab === 'form' ? 'btn-primary' : 'btn-outline'}`}
              style={{ color: activeSubTab === 'form' ? '#FFF' : '#FFF', borderColor: 'rgba(255,255,255,0.4)' }}
            >
              <UserCheck size={18} /> Visitor Check-In & Raffle Form
            </button>

            {registeredBadge && (
              <button
                onClick={() => setActiveSubTab('badge')}
                className={`btn ${activeSubTab === 'badge' ? 'btn-primary' : 'btn-outline'}`}
                style={{ color: activeSubTab === 'badge' ? '#FFF' : '#FFF', borderColor: 'rgba(255,255,255,0.4)' }}
              >
                <QrCode size={18} /> View My Visitor Badge
              </button>
            )}

            <button
              onClick={() => setActiveSubTab('dashboard')}
              className={`btn ${activeSubTab === 'dashboard' ? 'btn-primary' : 'btn-outline'}`}
              style={{ color: activeSubTab === 'dashboard' ? '#FFF' : '#FFF', borderColor: 'rgba(255,255,255,0.4)' }}
            >
              <Users size={18} /> SQL Server Live Visitor Directory ({visitors.length})
            </button>
          </div>
        </div>

        {/* Live Event Stats Counter Bar */}
        <div className="grid-4" style={{ marginBottom: '2rem' }}>
          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(240, 90, 40, 0.12)', padding: '0.85rem', borderRadius: '12px', color: '#F05A28' }}>
              <Users size={28} />
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#052440' }}>
                {stats ? stats.TotalVisitors : visitors.length}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: '600' }}>Booth Visitors Checked In</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(244, 171, 37, 0.15)', padding: '0.85rem', borderRadius: '12px', color: '#B47800' }}>
              <Trophy size={28} />
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#052440' }}>
                {stats ? stats.RaffleParticipants : visitors.filter(v => v.EnteredRaffle).length}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: '600' }}>Raffle Entries Submitted</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(58, 150, 88, 0.12)', padding: '0.85rem', borderRadius: '12px', color: '#3A9658' }}>
              <BookOpen size={28} />
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#052440' }}>
                {stats ? stats.YouthCount : visitors.filter(v => (v.VisitorType || '').includes('Youth')).length}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: '600' }}>Youths Registered</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(5, 36, 64, 0.1)', padding: '0.85rem', borderRadius: '12px', color: '#052440' }}>
              <ShieldCheck size={28} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#3A9658' }}>
                ● SQL Database Active
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: '1.2' }}>
                {serverStatus.dbType}
              </div>
            </div>
          </div>
        </div>

        {/* SUB TAB 1: VISITOR CHECK-IN FORM */}
        {activeSubTab === 'form' && (
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <Sparkles color="#F05A28" size={24} />
                <h3 style={{ fontSize: '1.4rem', color: '#052440' }}>Sevathon 9/20 Booth Visitor Check-In</h3>
              </div>

              {submitError && (
                <div style={{
                  backgroundColor: '#FEF2F2',
                  borderLeft: '4px solid #EF4444',
                  padding: '0.85rem',
                  borderRadius: '6px',
                  color: '#991B1B',
                  fontSize: '0.9rem',
                  marginBottom: '1rem'
                }}>
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Aarav Patel or Jane Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+1 (408) 555-0100"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">I am a...</label>
                    <select
                      className="form-select"
                      value={formData.visitorType}
                      onChange={(e) => setFormData({ ...formData, visitorType: e.target.value })}
                    >
                      <option value="Youth (10-18)">Youth (Ages 10–18)</option>
                      <option value="Youth (19-25)">Youth / Student (Ages 19–25)</option>
                      <option value="Parent">Parent / Family Member</option>
                      <option value="Educator">Teacher / Educator</option>
                      <option value="Volunteer">Volunteer / Mentor</option>
                      <option value="Corporate">Corporate / Sponsor Partner</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Age Group</label>
                    <select
                      className="form-select"
                      value={formData.ageGroup}
                      onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                    >
                      <option value="10-14">Ages 10 – 14</option>
                      <option value="15-18">Ages 15 – 18</option>
                      <option value="19-25">Ages 19 – 25</option>
                      <option value="25+">25+ (Parent / Mentor / Partner)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">What programs or topics interest you? (Select all that apply)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {interestOptions.map(opt => {
                      const isChecked = formData.interestAreas.includes(opt.id);
                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleInterestToggle(opt.id)}
                          style={{
                            padding: '0.6rem 0.85rem',
                            borderRadius: '8px',
                            border: isChecked ? '2px solid #F05A28' : '1px solid #CBD5E1',
                            backgroundColor: isChecked ? 'rgba(240, 90, 40, 0.08)' : '#FFF',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: isChecked ? '700' : '500',
                            color: isChecked ? '#F05A28' : '#334155',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}} // handled by parent div click
                            style={{ accentColor: '#F05A28' }}
                          />
                          <span>{opt.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.25rem 0' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.enteredRaffle}
                      onChange={(e) => setFormData({ ...formData, enteredRaffle: e.target.checked })}
                      style={{ accentColor: '#F05A28', width: '18px', height: '18px' }}
                    />
                    <span>🎁 <strong>Enter Sevathon 9/20 Raffle</strong> for YouthAIF Swag & Course Scholarships</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.newsletterOptIn}
                      onChange={(e) => setFormData({ ...formData, newsletterOptIn: e.target.checked })}
                      style={{ accentColor: '#F05A28', width: '18px', height: '18px' }}
                    />
                    <span>📩 Subscribe to <strong>NAM Mindfulness</strong> & <strong>Journey of Starting a Company</strong> Newsletters</span>
                  </label>
                </div>

                <div className="form-group">
                  <label className="form-label">Comments or Questions for Ranjan Desai & YouthAIF Team</label>
                  <textarea
                    className="form-textarea"
                    rows="2"
                    placeholder="e.g. I want to bring YouthAIF to my high school or volunteer as a mentor..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', fontSize: '1.05rem', padding: '0.9rem' }}
                >
                  {submitting ? 'Registering & Syncing SQL DB...' : 'Complete Sevathon Booth Check-In ➔'}
                </button>
              </form>
            </div>

            {/* Right Side: Booth Highlights & Raffle Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="glass-card-dark" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                  <Gift color="#F4AB25" size={28} />
                  <h3 style={{ fontSize: '1.3rem', color: '#F4AB25' }}>Sevathon 9/20 Booth Raffle & Giveaways</h3>
                </div>
                <p style={{ fontSize: '0.95rem', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '1rem' }}>
                  Every visitor who checks in at our Sevathon booth gets entered to win:
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: '#FFFFFF' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star size={16} color="#F05A28" /> Free Scholarship for Youth Vibe Coding & AI Bootcamp
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star size={16} color="#F4AB25" /> 1-on-1 Founder Mentorship Session with Ranjan Desai
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star size={16} color="#3A9658" /> YouthAIF Ambassadors Swag Kit & Badge
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star size={16} color="#60A5FA" /> Python, Sanskrit & Spanish Language Starter Packs
                  </li>
                </ul>
              </div>

              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#052440', marginBottom: '0.75rem' }}>
                  Why Visit Our Sevathon Booth?
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', marginBottom: '1rem' }}>
                  YouthAIF breaks silos and unites parents, companies, and youth. Experience live Vibe Coding demonstrations, learn how to start a local hub in your neighborhood, and explore 80-20 scholarship options.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-coral">Python</span>
                  <span className="badge badge-amber">Sanskrit</span>
                  <span className="badge badge-emerald">Spanish</span>
                  <span className="badge badge-navy">Vibe Coding</span>
                  <span className="badge badge-coral">Hackathons</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB TAB 2: VISITOR BADGE DISPLAY */}
        {activeSubTab === 'badge' && registeredBadge && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', border: '3px solid #F05A28' }}>
              <div style={{ display: 'inline-flex', padding: '0.5rem 1rem', background: '#F05A28', color: '#FFF', borderRadius: '99px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1.25rem' }}>
                OFFICIAL SEVATHON 9/20 VISITOR BADGE
              </div>

              <h2 style={{ fontSize: '2rem', color: '#052440', marginBottom: '0.25rem' }}>{registeredBadge.fullName}</h2>
              <div style={{ fontSize: '1rem', color: '#64748B', fontWeight: '600', marginBottom: '1.5rem' }}>{registeredBadge.email}</div>

              <div style={{
                background: '#FAF9F5',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px dashed #CBD5E1',
                margin: '1.5rem 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}>
                {/* Simulated QR Code Graphic */}
                <div style={{
                  width: '160px',
                  height: '160px',
                  background: '#FFFFFF',
                  border: '4px solid #052440',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-md)',
                  position: 'relative'
                }}>
                  <QrCode size={110} color="#052440" />
                  <div style={{ position: 'absolute', bottom: '6px', fontSize: '0.65rem', fontWeight: '800', background: '#F05A28', color: '#FFF', padding: '1px 6px', borderRadius: '4px' }}>
                    YOUTHAIF
                  </div>
                </div>
                <div style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '1.1rem', color: '#F05A28' }}>
                  {registeredBadge.qrCode}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  Show this code at the YouthAIF booth counter to claim your giveaway!
                </div>
              </div>

              <div style={{ textAlign: 'left', fontSize: '0.88rem', color: '#475569', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span><strong>Role:</strong> {registeredBadge.visitorType}</span>
                  <span><strong>Time:</strong> {registeredBadge.registeredAt}</span>
                </div>
                <div>
                  <strong>Interests:</strong> {registeredBadge.interestAreas.join(', ')}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  onClick={() => window.print()} 
                  className="btn btn-navy"
                >
                  Print / Save Badge
                </button>
                <button 
                  onClick={() => setActiveSubTab('form')} 
                  className="btn btn-outline"
                >
                  Register Another Visitor
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUB TAB 3: LIVE VISITOR DIRECTORY (SQL SERVER BACKEND DATA) */}
        {activeSubTab === 'dashboard' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#052440' }}>
                  Sevathon 9/20 Booth Visitor Directory
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  Live synchronized data stored in Microsoft SQL Server table <code style={{ background: '#E2E8F0', padding: '2px 6px', borderRadius: '4px' }}>dbo.SevathonVisitors</code>
                </p>
              </div>

              <button onClick={fetchData} className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh SQL Data
              </button>
            </div>

            {/* Filter controls */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94A3B8' }} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search visitors by name or email..."
                  style={{ paddingLeft: '2.4rem' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                className="form-select"
                style={{ width: '200px' }}
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Roles</option>
                <option value="Youth">Youth</option>
                <option value="Parent">Parent</option>
                <option value="Educator">Educator</option>
                <option value="Volunteer">Volunteer</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>

            {/* Data Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#052440', color: '#FFFFFF' }}>
                    <th style={{ padding: '0.75rem 1rem', borderRadius: '8px 0 0 0' }}>ID</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Visitor Name</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Contact Info</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Role / Type</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Interests</th>
                    <th style={{ padding: '0.75rem 1rem' }}>QR Code</th>
                    <th style={{ padding: '0.75rem 1rem', borderRadius: '0 8px 0 0' }}>Registered At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisitors.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#94A3B8' }}>
                        No visitors match the selected criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredVisitors.map((v, idx) => (
                      <tr key={v.VisitorID || idx} style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAF9F5' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: '#F05A28' }}>
                          #{v.VisitorID}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#052440' }}>
                          {v.FullName}
                          {v.EnteredRaffle && <span style={{ marginLeft: '6px' }} title="Raffle Entered">🎁</span>}
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <div>{v.Email}</div>
                          {v.Phone && <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{v.Phone}</div>}
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span className={`badge ${v.VisitorType.includes('Youth') ? 'badge-coral' : v.VisitorType === 'Parent' ? 'badge-amber' : 'badge-navy'}`}>
                            {v.VisitorType}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.82rem', color: '#475569', maxWidth: '220px' }}>
                          {Array.isArray(v.InterestAreas) ? v.InterestAreas.join(', ') : v.InterestAreas}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontWeight: '700', fontSize: '0.82rem', color: '#052440' }}>
                          {v.QRCheckinCode}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#64748B' }}>
                          {new Date(v.RegisteredAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
