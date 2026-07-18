'use client';

import { useState } from 'react';
import { Shield, ShieldCheck, ShieldX, Download, Briefcase, Globe, Star } from 'lucide-react';
import { api } from '@/lib/api';
import styles from './page.module.css';

const BENEFITS = [
  { icon: <Briefcase size={22} />, title: 'Employer Verified', desc: 'Recruiters can instantly verify your certificate authenticity via our public portal without needing any login.' },
  { icon: <Globe size={22} />, title: 'Shareable Globally', desc: 'Share your unique certificate ID on LinkedIn, GitHub, and your resume for verified international credibility.' },
  { icon: <Star size={22} />, title: 'Blockchain-Ready', desc: 'All certificates are tamper-proof and follow an immutable issuance trail — secured for Phase 2 blockchain migration.' }
];

export default function VerifyCertificate() {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState(null); // null | { verified, certificate? }
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certId.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await api.verifyCertificate(certId.trim());
      setResult(data);
    } catch (err) {
      setResult({ verified: false, message: err.message || 'Certificate not found.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className="neon-glow-bg" style={{ top: '5%', left: '30%' }}></div>

      {/* Hero */}
      <div className={styles.hero}>
        <Shield size={48} style={{ color: 'var(--accent-cyan)', margin: '0 auto 20px' }} />
        <h1 className={styles.title}>Verify Certificate</h1>
        <p className={styles.subtitle}>
          Enter a Hacknfinity certificate ID to instantly verify its authenticity. Try: <strong style={{ color: 'var(--accent-cyan)' }}>HACK-2026-111111</strong>
        </p>
      </div>

      <div className="container">
        {/* Search Form */}
        <div className={`${styles.searchBox} glass-panel`}>
          <h2 className={styles.searchTitle}>Enter Certificate ID</h2>
          <form onSubmit={handleVerify}>
            <div className={styles.inputRow}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. HACK-2026-111111"
                value={certId}
                onChange={(e) => setCertId(e.target.value.toUpperCase())}
              />
              <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }} disabled={loading}>
                {loading ? 'Checking...' : 'Verify Now'}
              </button>
            </div>
          </form>
        </div>

        {/* Result Card */}
        {result && (
          <div className={`${styles.resultCard} glass-panel`} style={{
            border: `1px solid ${result.verified ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
            background: result.verified ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)'
          }}>
            {result.verified ? (
              <>
                <ShieldCheck size={48} style={{ color: 'var(--accent-emerald)', marginBottom: '8px' }} />
                <h2 className={styles.resultTitle} style={{ color: 'var(--accent-emerald)' }}>Certificate Verified ✓</h2>
                <div className={styles.metaGrid}>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Certificate Holder</div>
                    <div className={styles.metaValue}>{result.certificate.userName}</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Event</div>
                    <div className={styles.metaValue}>{result.certificate.eventName}</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Certificate Type</div>
                    <div className={styles.metaValue} style={{ textTransform: 'capitalize' }}>{result.certificate.type}</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Issue Date</div>
                    <div className={styles.metaValue}>{new Date(result.certificate.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  </div>
                </div>
                <button className="btn-primary" style={{ display: 'inline-flex', marginTop: '8px' }}>
                  <Download size={16} /> Download Certificate
                </button>
              </>
            ) : (
              <>
                <ShieldX size={48} style={{ color: '#ef4444', marginBottom: '8px' }} />
                <h2 className={styles.resultTitle} style={{ color: '#ef4444' }}>Certificate Not Found</h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {result.message || 'We could not find a certificate with that ID. Please double-check and try again.'}
                </p>
              </>
            )}
          </div>
        )}

        {/* Why Certificates Matter */}
        <div style={{ marginTop: '80px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', textAlign: 'center', marginBottom: '12px' }}>Why Our Certificates Matter</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px' }}>
            Hacknfinity certificates are recognized by leading companies and universities across India.
          </p>
          <div className={styles.benefitsGrid}>
            {BENEFITS.map((b, i) => (
              <div key={i} className={`${styles.benefitCard} glass-panel`}>
                <div className={styles.iconWrap}>{b.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600' }}>{b.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', textAlign: 'center' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
