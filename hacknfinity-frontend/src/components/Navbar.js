'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, LogOut, User as UserIcon, Award } from 'lucide-react';
import { subscribeToAuth, logoutUser } from '@/lib/firebase';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Listen for Auth changes
    const unsubscribe = subscribeToAuth((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Team', path: '/team' },
    { name: 'Partners', path: '/partners' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" onClick={() => setIsOpen(false)} className={styles.logo}>
          <span className={styles.logoGlow}>HACKNFINITY</span>
        </Link>

        {/* Desktop Menu */}
        <ul className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`${styles.navLink} ${pathname === link.path ? styles.activeLink : ''}`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Verification Shortcut */}
          <li>
            <Link
              href="/verify-certificate"
              onClick={() => setIsOpen(false)}
              className={`${styles.navLink} ${pathname === '/verify-certificate' ? styles.activeLink : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-cyan)' }}
            >
              <Award size={16} /> Verify
            </Link>
          </li>

          {/* Auth State CTAs */}
          {user ? (
            <>
              <li>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className={`${styles.navLink} ${pathname === '/dashboard' ? styles.activeLink : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <UserIcon size={16} /> Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '13px' }}>
                  <LogOut size={14} /> Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/auth" onClick={() => setIsOpen(false)} className={`${styles.authBtn} btn-primary`} style={{ padding: '8px 20px', fontSize: '13px' }}>
                Join Community
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  );
}
