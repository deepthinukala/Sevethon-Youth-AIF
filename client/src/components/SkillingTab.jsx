import React from 'react';
import { Code, Brain, Award, Globe, Briefcase, Sparkles, CheckCircle } from 'lucide-react';

export default function SkillingTab({ setActiveTab }) {
  const courses = [
    {
      title: 'Learn Languages — Python, Sanskrit, Spanish',
      icon: Code,
      color: '#F05A28',
      desc: 'Polyglot mastery combining premier modern tech languages (Python) with classical ancient wisdom (Sanskrit) and global conversational fluency (Spanish).',
      bullets: [
        'Python 3 fundamentals & data structures',
        'Sanskrit grammar logic & mental agility',
        'Spanish conversational fluency for international collaboration'
      ]
    },
    {
      title: 'AI Courses, Hackathons & Digital Creativity',
      icon: Brain,
      color: '#F4AB25',
      desc: 'Hands-on generative AI tools, prompt engineering, custom model fine-tuning, and competitive innovation hackathons.',
      bullets: [
        'Generative AI image & content creation',
        'Building AI assistant tools',
        'Youth innovation hackathons with prizes'
      ]
    },
    {
      title: 'Leadership, Business Skills & Social Media',
      icon: Award,
      color: '#3A9658',
      desc: 'Empowering young founders with public speaking, project management, financial literacy, and personal branding.',
      bullets: [
        'Public speaking & pitching skills',
        'Social media presence for positive social impact',
        'Entrepreneurship & micro-business creation'
      ]
    },
    {
      title: 'Web Creation, Vibe Coding & Digital Tools',
      icon: Globe,
      color: '#052440',
      desc: 'Building modern web apps fast using React.js, Node.js, AI vibe coding tools, and modern UI frameworks.',
      bullets: [
        'Vibe coding with AI assistants',
        'React & Javascript interactive UI design',
        'Deploying full-stack web applications'
      ]
    },
    {
      title: 'Internships & Job Pathways for Graduates',
      icon: Briefcase,
      color: '#0F4A7E',
      desc: 'Connecting certified youth graduates directly to startups, non-profits, enterprise corporate partners, and mentors.',
      bullets: [
        'Corporate partner job placements',
        'Mentorship from Silicon Valley leaders',
        'Real-world portfolio project creation'
      ]
    }
  ];

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="container">
        {/* Banner */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>YOUTH-LED SKILLING & LEADERSHIP</span>
          <h1 style={{ fontSize: '2.5rem', color: '#052440', fontWeight: '800' }}>
            Future-Proof Skills for the AI Economy
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#64748B', maxWidth: '750px', margin: '0.75rem auto 0' }}>
            Empowering youth ages 10-25+ with real skills that translate directly into real jobs and real opportunities.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid-3" style={{ marginBottom: '3rem' }}>
          {courses.map((course, idx) => {
            const Icon = course.icon;
            return (
              <div key={idx} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    backgroundColor: course.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF',
                    marginBottom: '1.25rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <Icon size={26} />
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: '#052440', marginBottom: '0.75rem' }}>
                    {course.title}
                  </h3>

                  <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                    {course.desc}
                  </p>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#334155' }}>
                    {course.bullets.map((b, bIdx) => (
                      <li key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                        <CheckCircle size={16} color={course.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => setActiveTab('sevathon')} 
                  className="btn btn-outline"
                  style={{ marginTop: '1.5rem', width: '100%', fontSize: '0.88rem' }}
                >
                  Register Interest at Booth ➔
                </button>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="glass-card-dark" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <Sparkles color="#F4AB25" size={32} style={{ marginBottom: '0.5rem' }} />
          <h2 style={{ fontSize: '1.8rem', color: '#FFF', marginBottom: '0.75rem' }}>
            Want to bring these skilling courses to your school or local hub?
          </h2>
          <p style={{ fontSize: '1rem', color: '#CBD5E1', marginBottom: '1.5rem' }}>
            Visit our Sevathon 9/20 booth or send a direct inquiry to Ranjan Desai.
          </p>
          <button onClick={() => setActiveTab('sevathon')} className="btn btn-primary">
            Register at Sevathon 9/20 Booth ➔
          </button>
        </div>
      </div>
    </div>
  );
}
