'use client';

import { useState } from 'react';
import { Megaphone, Users, Globe, Handshake, Star, Zap } from 'lucide-react';
import { api } from '@/lib/api';
import styles from './page.module.css';

const PARTNERS = [
  'Major League Hacking', 'GeeksforGeeks', 'HackerEarth', 'Devfolio',
  'CodeChef', 'GitHub Education', 'DigitalOcean', 'Postman',
  'Wolfram Alpha', 'JetBrains', 'Auth0', 'Elastic'
];

const BENEFITS = [
  {
    icon: <Megaphone size={24} />,
    title: 'Brand Visibility',
    desc: 'Get featured across our social media, email newsletters, event banners, and the Hacknfinity website reaching 500K+ students.'
  },
  {
    icon: <Users size={24} />,
    title: 'Direct Student Reach',
    desc: 'Tap into our 10,000+ engaged members — all students passionate about building with technology.'
  },
  {
    icon: <Globe size={24} />,
    title: 'Event Co-Hosting',
    desc: 'Co-host workshops, tech talks, and hackathons under the Hacknfinity umbrella with our operational and promotional support.'
  },
  {
    icon: <Handshake size={24} />,
    title: 'Talent Pipeline',
    desc: 'Access our top performers, project portfolios, and community developers for internships and hiring opportunities.'
  },
  {
    icon: <Star size={24} />,
    title: 'Community Endorsement',
    desc: 'Get recognized as a community-first brand by one of India\'s most active student tech ecosystems.'
  },
  {
    icon: <Zap size={24} />,
    title: 'API & Tool Promotion',
    desc: 'Promote your developer tools, APIs, and platforms through exclusive workshops and hackathon challenges.'
  }
];

export default function Partners() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', linkedin: '', website: '', motivation: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      await api.submitApplication({
        type: 'partner',
        name: form.name,
        email: form.email,
        phone: form.phone,
        linkedin: form.linkedin,
        questions: { website: form.website, motivation: form.motivation }
      });
      setStatus({ loading: false, success: true, error: '' });
      setForm({ name: '', email: '', phone: '', linkedin: '', website: '', motivation: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message || 'Submission failed.' });
    }
  };

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Header */}
      <section className={styles.header}>
        <div className="neon-glow-bg" style={{ top: '10%', left: '30%' }}></div>
        <div className="container">
          <h1 className={styles.title}>Community Partners</h1>
          <p className={styles.subtitle}>
            We collaborate with companies, communities, and platforms who share our belief in empowering student developers.
          </p>
        </div>
      </section>

      {/* Current Partners */}
      <section className={styles.section}>
        <div className="container">
          <h2 style={{ fontSize: '32px', fontWeight: '700', textAlign: 'center', marginBottom: '12px' }}>Our Partners</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px' }}>Organisations we are proud to work alongside.</p>
          <div className={styles.logosGrid}>
            {PARTNERS.map((partner, i) => (
              <div key={i} className={`${styles.logoBox} glass-panel`} style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-secondary)' }}>
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.section} style={{ background: 'rgba(12,13,22,0.4)' }}>
        <div className="container">
          <h2 style={{ fontSize: '32px', fontWeight: '700', textAlign: 'center', marginBottom: '12px' }}>Partnership Benefits</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px' }}>Why leading brands choose to partner with Hacknfinity.</p>
          <div className={styles.grid}>
            {BENEFITS.map((b, i) => (
              <div key={i} className={`${styles.benefitCard} glass-panel glass-panel-hover`}>
                <div className={styles.iconWrapper}>{b.icon}</div>
                <h3 className={styles.cardTitle}>{b.title}</h3>
                <p className={styles.cardDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className={styles.section}>
        <div className="container">
          <div className={`${styles.formWrapper} glass-panel`}>
            <h2 className={styles.formTitle}>Become a Community Partner</h2>

            {status.success ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Application Submitted!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Our partnerships team will review your application and get back to you within 3-5 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>Organisation / Your Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="form-input" placeholder="e.g. Devfolio" />
                </div>
                <div className={styles.formGroup}>
                  <label>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required className="form-input" placeholder="partnerships@company.com" />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required className="form-input" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className={styles.formGroup}>
                  <label>LinkedIn / Company URL</label>
                  <input name="linkedin" value={form.linkedin} onChange={handleChange} className="form-input" placeholder="https://linkedin.com/company/..." />
                </div>
                <div className={styles.formGroup}>
                  <label>Website</label>
                  <input name="website" value={form.website} onChange={handleChange} className="form-input" placeholder="https://yourcompany.com" />
                </div>
                <div className={styles.formGroup}>
                  <label>Why do you want to partner with us? *</label>
                  <textarea name="motivation" value={form.motivation} onChange={handleChange} required className="form-input" rows={4} placeholder="Tell us about your goals and how we can collaborate..." />
                </div>
                {status.error && <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px' }}>{status.error}</p>}
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status.loading}>
                  {status.loading ? 'Submitting...' : 'Submit Partnership Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
