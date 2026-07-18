'use client';

import { useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { api } from '@/lib/api';
import styles from './page.module.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      await api.submitContact(form);
      setStatus({ loading: false, success: true, error: '' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message || 'Failed to send message.' });
    }
  };

  return (
    <div style={{ paddingBottom: '100px' }}>
      <div className="neon-glow-bg" style={{ top: '10%', left: '30%', position: 'fixed' }}></div>
      <div className="container">
        <div className={styles.layout}>
          {/* Left: Contact Form */}
          <div className={`${styles.formBox} glass-panel`}>
            <h1 className={styles.formTitle}>Send Us a Message</h1>
            {status.success ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✉️</div>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you within 24–48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>Your Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="form-input" placeholder="Jane Doe" />
                </div>
                <div className={styles.formGroup}>
                  <label>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required className="form-input" placeholder="jane@example.com" />
                </div>
                <div className={styles.formGroup}>
                  <label>Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} className="form-input" placeholder="e.g. Partnership Inquiry" />
                </div>
                <div className={styles.formGroup}>
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required className="form-input" rows={5} placeholder="How can we help?" />
                </div>
                {status.error && <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '12px' }}>{status.error}</p>}
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status.loading}>
                  {status.loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Info */}
          <div className={styles.infoCol}>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Get in Touch</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
              Have a question about events, sponsorships, or partnerships? We'd love to hear from you.
            </p>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}><Mail size={20} /></div>
              <div>
                <div className={styles.infoLabel}>Email</div>
                <div className={styles.infoValue}>hello@hacknfinity.org</div>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <div>
                <div className={styles.infoLabel}>LinkedIn</div>
                <a href="https://linkedin.com/company/hacknfinity" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', fontSize: '15px' }}>
                  linkedin.com/company/hacknfinity
                </a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div>
                <div className={styles.infoLabel}>Twitter / X</div>
                <a href="https://twitter.com/hacknfinity" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', fontSize: '15px' }}>
                  @hacknfinity
                </a>
              </div>
            </div>

            <div style={{ marginTop: '8px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
                Join 10,000+ developers on our WhatsApp community for real-time updates, resources, and team formations.
              </p>
              <a href="https://wa.me/91xxxxxxxxxx" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
                <MessageCircle size={18} /> Join WhatsApp Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}