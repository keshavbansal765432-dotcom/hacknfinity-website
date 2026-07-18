'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Send } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <span className={styles.logoGlow}>HACKNFINITY</span>
            </div>
            <p className={styles.desc}>
              India's fastest growing student tech community, empowering the next generation of innovators, designers, and developers through hackathons, bootcamps, and real-world projects.
            </p>
            <div className={styles.socials}>
              {/* LinkedIn - Replaced with official SVG */}
              <a href="https://linkedin.com/company/hacknfinity" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* GitHub - Replaced with official SVG */}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              {/* X / Twitter - Replaced with official SVG */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Discord - Uses safely imported MessageSquare */}
              <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Discord">
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className={styles.colHeader}>Community</h3>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}><Link href="/about">About Us</Link></li>
              <li className={styles.linkItem}><Link href="/team">Core Team</Link></li>
              <li className={styles.linkItem}><Link href="/partners">Community Partners</Link></li>
              <li className={styles.linkItem}><Link href="/sponsors">Sponsors</Link></li>
            </ul>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className={styles.colHeader}>Explore</h3>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}><Link href="/events">Events</Link></li>
              <li className={styles.linkItem}><Link href="/gallery">Gallery</Link></li>
              <li className={styles.linkItem}><Link href="/blog">Tech Blog</Link></li>
              <li className={styles.linkItem}><Link href="/contact">Get in Touch</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className={styles.newsletterCol}>
            <h3 className={styles.colHeader}>Stay Updated</h3>
            <p className={styles.desc} style={{ fontSize: '13px' }}>
              Subscribe to our newsletter to receive updates about upcoming hackathons, workshops, and recruitment.
            </p>
            <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.newsletterBtn} aria-label="Subscribe">
                <Send size={16} />
              </button>
            </form>
            {subscribed && (
              <p style={{ color: 'var(--accent-emerald)', fontSize: '13px', fontWeight: '500' }}>
                🎉 Successfully subscribed to newsletter!
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Hacknfinity Community. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}