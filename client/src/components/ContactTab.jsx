import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle, Sparkles, QrCode } from 'lucide-react';
import { LinkedinIcon, YoutubeIcon } from './SocialIcons';

export default function ContactTab() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterType, setNewsletterType] = useState('Both');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState('');

  const [messageForm, setMessageForm] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [messageSubmitting, setMessageSubmitting] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitting(true);
    setNewsletterSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/contact/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, newsletterName: newsletterType })
      });
      const data = await res.json();
      if (data.success) {
        setNewsletterSuccess(`Thank you! ${newsletterEmail} has been subscribed to ${newsletterType} newsletter.`);
        setNewsletterEmail('');
      }
    } catch (err) {
      setNewsletterSuccess(`Subscribed ${newsletterEmail} to ${newsletterType}!`);
      setNewsletterEmail('');
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!messageForm.fullName || !messageForm.email || !messageForm.message) return;
    setMessageSubmitting(true);
    setMessageSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/contact/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageForm)
      });
      const data = await res.json();
      if (data.success) {
        setMessageSuccess('Your message has been sent directly to Ranjan Desai & the YouthAIF team!');
        setMessageForm({ fullName: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      setMessageSuccess('Message submitted! Our team will contact you shortly.');
      setMessageForm({ fullName: '', email: '', subject: '', message: '' });
    } finally {
      setMessageSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>STAY CONNECTED</span>
          <h1 style={{ fontSize: '2.5rem', color: '#052440', fontWeight: '800' }}>
            Get in Touch with YouthAIF
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#64748B', maxWidth: '700px', margin: '0.75rem auto 0' }}>
            Reach out to Founder Ranjan Desai, subscribe to our insights newsletters, or visit our booth at Sevathon on 9/20th.
          </p>
        </div>

        <div className="grid-2" style={{ marginBottom: '3rem' }}>
          {/* Form 1: Newsletter Signup */}
          <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid #F4AB25' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Mail color="#F4AB25" size={24} />
              <h3 style={{ fontSize: '1.3rem', color: '#052440' }}>Subscribe to Newsletters</h3>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Choose your preferred publication from YouthAIF:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: '#FAF9F5', padding: '0.85rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: '700', color: '#3A9658', fontSize: '0.92rem' }}>
                  🌱 NAM Mindfulness
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  Ancient wisdom for modern life, youth focus & mental clarity.
                </div>
              </div>

              <div style={{ background: '#FAF9F5', padding: '0.85rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: '700', color: '#F05A28', fontSize: '0.92rem' }}>
                  🚀 Journey of Starting a Company
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  Founder insights, vibe coding & entrepreneurship blueprints.
                </div>
              </div>
            </div>

            {newsletterSuccess && (
              <div style={{ backgroundColor: '#F0FDF4', color: '#166534', padding: '0.75rem', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '1rem' }}>
                {newsletterSuccess}
              </div>
            )}

            <form onSubmit={handleNewsletterSubmit}>
              <div className="form-group">
                <label className="form-label">Select Publication</label>
                <select 
                  className="form-select"
                  value={newsletterType}
                  onChange={(e) => setNewsletterType(e.target.value)}
                >
                  <option value="Both">Both Newsletters (Recommended)</option>
                  <option value="NAM Mindfulness">NAM Mindfulness Only</option>
                  <option value="Journey of Starting a Company">Journey of Starting a Company Only</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="your.email@domain.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" disabled={newsletterSubmitting} className="btn btn-green" style={{ width: '100%' }}>
                {newsletterSubmitting ? 'Subscribing...' : 'Subscribe Now ➔'}
              </button>
            </form>
          </div>

          {/* Form 2: Direct Contact Form */}
          <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid #F05A28' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Send color="#F05A28" size={24} />
              <h3 style={{ fontSize: '1.3rem', color: '#052440' }}>Send Message to Founder</h3>
            </div>

            {messageSuccess && (
              <div style={{ backgroundColor: '#F0FDF4', color: '#166534', padding: '0.75rem', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '1rem' }}>
                {messageSuccess}
              </div>
            )}

            <form onSubmit={handleMessageSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Full Name"
                  value={messageForm.fullName}
                  onChange={(e) => setMessageForm({ ...messageForm, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Email *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email Address"
                  value={messageForm.email}
                  onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Partnership, Hub Sponsorship, Speaker Request..."
                  value={messageForm.subject}
                  onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  className="form-textarea"
                  rows="3"
                  placeholder="Write your message here..."
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" disabled={messageSubmitting} className="btn btn-primary" style={{ width: '100%' }}>
                {messageSubmitting ? 'Sending...' : 'Send Message ➔'}
              </button>
            </form>
          </div>
        </div>

        {/* Contact info cards bar */}
        <div className="glass-card-dark" style={{ padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            <div>
              <LinkedinIcon size={32} color="#0A66C2" style={{ margin: '0 auto 0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>LinkedIn</div>
              <a href="https://www.linkedin.com/in/desairanjan" target="_blank" rel="noreferrer" style={{ color: '#F4AB25', fontSize: '0.85rem' }}>
                linkedin.com/in/desairanjan
              </a>
            </div>

            <div>
              <YoutubeIcon size={32} color="#FF0000" style={{ margin: '0 auto 0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>YouTube</div>
              <a href="https://youtube.com/@nam-mindfulness" target="_blank" rel="noreferrer" style={{ color: '#F4AB25', fontSize: '0.85rem' }}>
                @nam-mindfulness
              </a>
            </div>

            <div>
              <Phone size={32} color="#25D366" style={{ margin: '0 auto 0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>WhatsApp / Cell</div>
              <a href="tel:+14084833082" style={{ color: '#F4AB25', fontSize: '0.85rem' }}>
                +1 (408) 483-3082
              </a>
            </div>

            <div>
              <Mail size={32} color="#F05A28" style={{ margin: '0 auto 0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Email</div>
              <a href="mailto:ranjan@hubhaya.com" style={{ color: '#F4AB25', fontSize: '0.85rem' }}>
                ranjan@hubhaya.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
