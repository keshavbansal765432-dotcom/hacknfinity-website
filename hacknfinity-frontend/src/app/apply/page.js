'use client';

import { useState, useRef } from 'react';
import { Code2, Heart, Mic, Globe, Handshake } from 'lucide-react';
import { api } from '@/lib/api';
import styles from './page.module.css';

const ROLES = [
  { id: 'core-team', icon: <Code2 size={22} />, title: 'Core Team', desc: 'Technical, design, content, and operations roles.' },
  { id: 'volunteer', icon: <Heart size={22} />, title: 'Volunteer', desc: 'Help run events, workshops, and community drives.' },
  { id: 'speaker', icon: <Mic size={22} />, title: 'Speaker', desc: 'Deliver a tech talk, workshop, or panel discussion.' },
  { id: 'campus-ambassador', icon: <Globe size={22} />, title: 'Campus Ambassador', desc: 'Represent Hacknfinity at your college.' },
  { id: 'partner', icon: <Handshake size={22} />, title: 'Community Partner', desc: 'Collaborate with us as an organization or brand.' }
];

export default function Apply() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', linkedin: '', github: '', motivation: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const formRef = useRef(null);

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setStatus({ loading: false, success: false, error: '' });
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) return;
    setStatus({ loading: true, success: false, error: '' });
    try {
      await api.submitApplication({
        type: selectedRole,
        name: form.name,
        email: form.email,
        phone: form.phone,
        linkedin: form.linkedin,
        github: form.github,
        questions: { motivation: form.motivation }
      });
      setStatus({ loading: false, success: true, error: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message || 'Submission failed.' });
    }
  };

  const selectedRoleName = ROLES.find(r => r.id === selectedRole)?.title || '';

  return (
    <div className={styles.page}>
      <div className="neon-glow-bg" style={{ top: '5%', left: '30%' }}></div>

      {/* Hero */}
      <div className={styles.hero}>
        <h1 className={styles.title}>Join the <span className="text-gradient-clip">Hacknfinity</span> Family</h1>
        <p className={styles.subtitle}>
          Whether you code, design, speak, organize, or lead — there's a place for you. Pick your role below to get started.
        </p>
      </div>

      <div className="container">
        {/* Role Cards */}
        <div className={styles.rolesGrid}>
          {ROLES.map((role) => (
            <div
              key={role.id}
              className={`${styles.roleCard} glass-panel ${selectedRole === role.id ? styles.selected : ''}`}
              onClick={() => handleRoleSelect(role.id)}
            >
              <div className={styles.roleIcon}>{role.icon}</div>
              <div className={styles.roleTitle}>{role.title}</div>
              <div className={styles.roleDesc}>{role.desc}</div>
            </div>
          ))}
        </div>

        {/* Application Form */}
        {selectedRole && (
          <div ref={formRef}>
            <div className={`${styles.formWrapper} glass-panel`}>
              {status.success ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Application Submitted!</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Thank you for applying to be a <strong>{selectedRoleName}</strong>! Our team will review your application and reach out within 5-7 days.
                  </p>
                  <button className="btn-secondary" style={{ marginTop: '24px' }} onClick={() => { setSelectedRole(null); setStatus({ loading: false, success: false, error: '' }); }}>
                    Apply for Another Role
                  </button>
                </div>
              ) : (
                <>
                  <h2 className={styles.formTitle}>Apply as {selectedRoleName}</h2>
                  <p className={styles.formSubtitle}>Fill in the details below and our team will review your application.</p>
                  <form onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Full Name *</label>
                        <input name="name" value={form.name} onChange={handleChange} required className="form-input" placeholder="Jane Doe" />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Email Address *</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} required className="form-input" placeholder="jane@example.com" />
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Phone Number *</label>
                        <input name="phone" value={form.phone} onChange={handleChange} required className="form-input" placeholder="+91 XXXXX XXXXX" />
                      </div>
                      <div className={styles.formGroup}>
                        <label>LinkedIn URL</label>
                        <input name="linkedin" value={form.linkedin} onChange={handleChange} className="form-input" placeholder="https://linkedin.com/in/..." />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>GitHub / Portfolio URL</label>
                      <input name="github" value={form.github} onChange={handleChange} className="form-input" placeholder="https://github.com/..." />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Why do you want to join as {selectedRoleName}? *</label>
                      <textarea name="motivation" value={form.motivation} onChange={handleChange} required className="form-input" rows={4} placeholder="Tell us about your experience, goals, and what you'd bring to Hacknfinity..." />
                    </div>
                    {status.error && <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '12px' }}>{status.error}</p>}
                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status.loading}>
                      {status.loading ? 'Submitting...' : `Submit ${selectedRoleName} Application`}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
