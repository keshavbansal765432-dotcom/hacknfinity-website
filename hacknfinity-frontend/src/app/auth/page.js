'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginEmail, registerEmail, loginGoogle, subscribeToAuth } from '@/lib/firebase';
import { api } from '@/lib/api';
import styles from './page.module.css';

export default function Auth() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const unsub = subscribeToAuth((user) => {
      if (user) router.replace('/dashboard');
    });
    return () => unsub();
  }, [router]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const postAuth = async (user, customDisplayName = '') => {
    try {
      // 1. Fetch the actual authentic token from the Firebase user object
      const token = await user.getIdToken();
      
      // 2. Synchronize with your Node/Express API, providing user parameters
      await api.syncUser(token, {
        email: user.email,
        displayName: user.displayName || customDisplayName || form.name,
        photoURL: user.photoURL || ''
      });
    } catch (e) {
      console.error('Sync error:', e.message);
    }
    router.push('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const result = await loginEmail(form.email, form.password);
        await postAuth(result.user);
      } else {
        if (form.password !== form.confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }
        const result = await registerEmail(form.email, form.password, form.name);
        await postAuth(result.user, form.name);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await loginGoogle();
      await postAuth(result.user);
    } catch (err) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page} style={{ minHeight: 'calc(100vh - 80px)' }}>
      {/* Left Branding Panel */}
      <div className={styles.brandPanel}>
        <div className={styles.brandLogo}>HACKNFINITY</div>
        <h1 className={styles.brandTitle}>Build. Collaborate.<br />Innovate.</h1>
        <p className={styles.brandDesc}>
          Join 10,000+ student developers who are learning, competing, and landing their dream tech roles through Hacknfinity.
        </p>
        <div className={styles.brandStats}>
          <div className={styles.brandStat}>
            <div className={styles.statNum}>10K+</div>
            <div className={styles.statLbl}>Members</div>
          </div>
          <div className={styles.brandStat}>
            <div className={styles.statNum}>50+</div>
            <div className={styles.statLbl}>Events</div>
          </div>
          <div className={styles.brandStat}>
            <div className={styles.statNum}>₹4L+</div>
            <div className={styles.statLbl}>Prizes Won</div>
          </div>
        </div>
      </div>

      {/* Right Auth Form Panel */}
      <div className={styles.formPanel}>
        <div className={`${styles.formBox} glass-panel`}>
          <h2 className={styles.formTitle}>{mode === 'login' ? 'Welcome Back 👋' : 'Join Hacknfinity 🚀'}</h2>
          <p className={styles.formSubtitle}>
            {mode === 'login' ? 'Sign in to access your dashboard and events.' : 'Create your free account in seconds.'}
          </p>

          {/* Google Sign-In */}
          <button className={styles.googleBtn} onClick={handleGoogle} disabled={loading}>
            <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Continue with Google
          </button>

          <div className={styles.divider}>or</div>

          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} required className="form-input" placeholder="Jane Doe" />
              </div>
            )}
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="form-input" placeholder="you@example.com" />
            </div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} required className="form-input" placeholder="••••••••" minLength={6} />
            </div>
            {mode === 'register' && (
              <div className={styles.formGroup}>
                <label>Confirm Password</label>
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required className="form-input" placeholder="••••••••" />
              </div>
            )}
            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '12px 16px', color: '#ef4444', fontSize: '13px', marginBottom: '16px' }}>
                {error}
              </div>
            )}
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '4px' }} disabled={loading}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className={styles.toggleText}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button className={styles.toggleLink} onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
              {mode === 'login' ? 'Register here' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}