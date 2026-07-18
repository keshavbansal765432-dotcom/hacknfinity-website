'use client';

import { useState } from 'react';
import { Download, Star } from 'lucide-react';
import { api } from '@/lib/api';
import styles from './page.module.css';

const TIERS = [
  {
    tier: 'gold', label: 'Gold Sponsor', amount: '₹1,00,000+',
    benefits: [
      'Headline sponsor branding on all event materials',
      'Dedicated stage time at flagship hackathon',
      'Logo on website hero section',
      'Featured newsletter spotlight (50K subscribers)',
      'Recruiting booth at all events',
      'Social media campaign (10+ posts)',
      'Direct access to top 50 community performers'
    ]
  },
  {
    tier: 'silver', label: 'Silver Sponsor', amount: '₹50,000–₹1,00,000',
    benefits: [
      'Co-sponsor branding on event materials',
      'Logo on Events & Sponsors pages',
      'Newsletter mention (monthly)',
      'Social media shoutout (5+ posts)',
      'Access to candidate pool after events',
      'One workshop slot per quarter'
    ]
  },
  {
    tier: 'bronze', label: 'Bronze Sponsor', amount: '₹10,000–₹50,000',
    benefits: [
      'Brand logo on website Sponsors page',
      'Social media mention (3 posts)',
      'Credited in event communication emails',
      'Certificate of sponsorship'
    ]
  }
];

const CURRENT_SPONSORS = ['Devfolio Inc.', 'Postman', 'DigitalOcean', 'GitHub', 'Vercel', 'Render'];
const PAST_SPONSORS = ['MLH', 'JetBrains', 'Notion', 'Cloudinary'];

export default function Sponsors() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', linkedin: '', tier: 'gold', message: '' });
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
        questions: { sponsorshipTier: form.tier, message: form.message }
      });
      setStatus({ loading: false, success: true, error: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message || 'Submission failed.' });
    }
  };

  return (
    <div style={{ paddingBottom: '100px' }}>
      <section className={styles.header}>
        <div className="neon-glow-bg" style={{ top: '10%', left: '30%' }}></div>
        <div className="container">
          <h1 className={styles.title}>Sponsor Hacknfinity</h1>
          <p className={styles.subtitle}>
            Partner with India's fastest-growing student developer community and reach 10,000+ engaged tech students.
          </p>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className={styles.section}>
        <div className="container">
          <h2 style={{ fontSize: '32px', fontWeight: '700', textAlign: 'center', marginBottom: '12px' }}>Sponsorship Tiers</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px' }}>Choose a tier that aligns with your goals and budget.</p>
          <div className={styles.tiersGrid}>
            {TIERS.map((t) => (
              <div key={t.tier} className={`${styles.tierCard} ${styles[t.tier]}`}>
                <div>
                  <div className={styles.tierLabel}>{t.label}</div>
                  <div className={styles.tierAmount}>{t.amount}</div>
                </div>
                <ul className={styles.tierBenefits}>
                  {t.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Download Brochure CTA */}
          <div className={styles.brochureCTA}>
            <Star size={32} style={{ color: 'var(--accent-cyan)', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '8px' }}>Download Sponsorship Brochure</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Get our full sponsorship deck with detailed metrics, audience demographics, and past event highlights.
            </p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex' }}>
              <Download size={18} /> Download Brochure (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Current Sponsors */}
      <section className={styles.section} style={{ background: 'rgba(12,13,22,0.4)' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: '700', textAlign: 'center', marginBottom: '32px' }}>Current Sponsors</h2>
          <div className={styles.sponsorsGrid}>
            {CURRENT_SPONSORS.map((s, i) => (
              <div key={i} className={`${styles.sponsorBox} glass-panel`}>{s}</div>
            ))}
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', textAlign: 'center', margin: '48px 0 24px', color: 'var(--text-secondary)' }}>Past Sponsors</h2>
          <div className={styles.sponsorsGrid}>
            {PAST_SPONSORS.map((s, i) => (
              <div key={i} className={`${styles.sponsorBox} glass-panel`} style={{ opacity: 0.6 }}>{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Sponsor Form */}
      <section className={styles.section}>
        <div className="container">
          <div className={`${styles.formWrapper} glass-panel`}>
            <h2 className={styles.formTitle}>Become a Sponsor</h2>
            {status.success ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
                <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Thank you for reaching out!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Our team will contact you within 48 hours to discuss the next steps.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>Company / Your Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="form-input" placeholder="e.g. Acme Technologies" />
                </div>
                <div className={styles.formGroup}>
                  <label>Business Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required className="form-input" placeholder="sponsor@company.com" />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required className="form-input" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className={styles.formGroup}>
                  <label>Preferred Tier</label>
                  <select name="tier" value={form.tier} onChange={handleChange} className="form-input">
                    <option value="gold">Gold (₹1,00,000+)</option>
                    <option value="silver">Silver (₹50,000–₹1,00,000)</option>
                    <option value="bronze">Bronze (₹10,000–₹50,000)</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Message / Goals</label>
                  <textarea name="message" value={form.message} onChange={handleChange} className="form-input" rows={4} placeholder="Tell us about your sponsorship goals..." />
                </div>
                {status.error && <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px' }}>{status.error}</p>}
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status.loading}>
                  {status.loading ? 'Submitting...' : 'Submit Sponsorship Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
