'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Award, Trophy, Star, Copy, Check, LogOut } from 'lucide-react';
import { subscribeToAuth, logoutUser } from '@/lib/firebase';
import { api } from '@/lib/api';
import styles from './page.module.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = subscribeToAuth(async (currentUser) => {
      if (!currentUser) {
        router.replace('/auth');
        return;
      }
      setUser(currentUser);
      try {
        const data = await api.getProfile();
        setProfile(data);
      } catch {
        // Profile might not be synced yet — show basic data from auth
      }
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  const copyReferral = () => {
    const code = profile?.referralCode || 'HACK0000';
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleLogout = async () => {
    await logoutUser();
    router.push('/');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)', color: 'var(--text-muted)' }}>
        Loading your dashboard...
      </div>
    );
  }

  const displayName = profile?.name || user?.displayName || user?.email?.split('@')[0] || 'Hacker';
  const events = profile?.registeredEvents || [];
  const certs = profile?.certificates || [];

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={`${styles.sidebar} glass-panel`}>
            <div className={styles.sidebarUser}>
              <img
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=7c3aed&color=fff&size=80`}
                alt={displayName}
                className={styles.avatar}
              />
              <div className={styles.userName}>{displayName}</div>
              <div className={styles.userEmail}>{user?.email}</div>
            </div>

            <button className={styles.navItem}><Calendar size={16} /> Events</button>
            <button className={styles.navItem}><Award size={16} /> Certificates</button>
            <button className={styles.navItem}><Trophy size={16} /> Leaderboard</button>
            <button className={styles.navItem}><Star size={16} /> Referrals</button>
            <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-glass)' }}>
              <button className={styles.navItem} onClick={handleLogout} style={{ color: '#ef4444' }}>
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className={styles.main}>
            {/* Welcome */}
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '4px' }}>Welcome back, {displayName.split(' ')[0]}! 👋</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Here's a summary of your Hacknfinity activity.</p>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
              <div className={`${styles.statCard} glass-panel`}>
                <div className={styles.statNum}>{events.length}</div>
                <div className={styles.statLabel}>Events Registered</div>
              </div>
              <div className={`${styles.statCard} glass-panel`}>
                <div className={styles.statNum}>{certs.length}</div>
                <div className={styles.statLabel}>Certificates</div>
              </div>
              <div className={`${styles.statCard} glass-panel`}>
                <div className={styles.statNum}>{profile?.points || 0}</div>
                <div className={styles.statLabel}>Points Earned</div>
              </div>
              <div className={`${styles.statCard} glass-panel`}>
                <div className={styles.statNum}>#{profile?.leaderboardRank || '—'}</div>
                <div className={styles.statLabel}>Leaderboard Rank</div>
              </div>
            </div>

            {/* Referral Code */}
            <div className="glass-panel" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px 12px', borderBottom: '1px solid var(--border-glass)' }}>
                <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>Your Referral Code</h2>
              </div>
              <div className={styles.referralBox}>
                <div>
                  <div className={styles.referralCode}>{profile?.referralCode || 'HACK0000'}</div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Earn 100 bonus points for every friend who joins using your code.
                  </p>
                </div>
                <button className={styles.copyBtn} onClick={copyReferral}>
                  {copied ? <><Check size={14} style={{ display: 'inline', marginRight: '4px' }} />Copied!</> : <><Copy size={14} style={{ display: 'inline', marginRight: '4px' }} />Copy Code</>}
                </button>
              </div>
            </div>

            {/* Registered Events */}
            <div className="glass-panel" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px 12px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>Registered Events</h2>
                <Link href="/events" style={{ fontSize: '13px', color: 'var(--accent-cyan)' }}>Browse All →</Link>
              </div>
              {events.length > 0 ? events.map((event, i) => (
                <div key={i} className={styles.listItem}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '15px' }}>{event.title || 'Event'}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                      {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                    </div>
                  </div>
                  <Link href={`/events/${event._id || event}`} className="btn-secondary" style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '12px' }}>
                    View
                  </Link>
                </div>
              )) : (
                <div className={styles.emptyState}>
                  <Calendar size={32} style={{ margin: '0 auto 12px', color: 'var(--text-muted)' }} />
                  <p>No events registered yet.</p>
                  <Link href="/events" style={{ color: 'var(--accent-cyan)', fontSize: '14px', display: 'inline-block', marginTop: '8px' }}>Browse upcoming events →</Link>
                </div>
              )}
            </div>

            {/* Certificates */}
            <div className="glass-panel" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px 12px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>My Certificates</h2>
                <Link href="/verify-certificate" style={{ fontSize: '13px', color: 'var(--accent-cyan)' }}>Verify →</Link>
              </div>
              {certs.length > 0 ? certs.map((cert, i) => (
                <div key={i} className={styles.listItem}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '15px' }}>{cert.eventName || 'Certificate'}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>ID: {cert.certificateId || '—'} • {cert.type || 'participation'}</div>
                  </div>
                  <span style={{ padding: '4px 12px', borderRadius: '50px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: 'var(--accent-emerald)', fontSize: '12px', fontWeight: '600' }}>
                    Issued
                  </span>
                </div>
              )) : (
                <div className={styles.emptyState}>
                  <Award size={32} style={{ margin: '0 auto 12px', color: 'var(--text-muted)' }} />
                  <p>No certificates issued yet.</p>
                  <p style={{ fontSize: '13px', marginTop: '4px', color: 'var(--text-muted)' }}>Participate in events to earn your first certificate!</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
