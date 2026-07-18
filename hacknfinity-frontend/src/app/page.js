'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Users, Award, Shield, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import styles from './page.module.css';

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const events = await api.getEvents();
        // Show the top 2 active/featured events on the landing page
        setFeaturedEvents(events.slice(0, 2));
      } catch (err) {
        console.error('Failed to load events for homepage:', err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const stats = [
    { number: '10K+', label: 'Community Members' },
    { number: '100+', label: 'Collaborations' },
    { number: '50+', label: 'Events Conducted' },
    { number: '500K+', label: 'Digital Reach' }
  ];

  const partners = [
    'GitHub', 'Postman', 'Devpost', 'Major League Hacking', 
    'DigitalOcean', 'Vercel', 'Render', 'Elastic', 'Clerk'
  ];

  const testimonials = [
    {
      text: 'Joining Hacknfinity was the turning point in my college journey. I went from coding basic calculator apps to leading a team of 4 that won a national blockchain hackathon.',
      name: 'Aditya Verma',
      title: 'Member since 2024',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150'
    },
    {
      text: 'As a community partner, we hosted multiple workshops with Hacknfinity. The student engagement is unparalleled, and the team manages logistics flawlessly.',
      name: 'Sneha Rao',
      title: 'DevRel, TechVantage',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150'
    },
    {
      text: 'The certificate verification portal is so useful. Employers checked my Hacknfinity certificates directly via the QR code during my interview rounds!',
      name: 'Rohan Mehta',
      title: 'Full Stack Engineer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="neon-glow-bg" style={{ top: '10%', left: '30%' }}></div>
        <div className="neon-glow-bg" style={{ top: '30%', right: '20%', background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)' }}></div>
        
        <div className={styles.heroContent}>
          <span className={`${styles.tagline} float-anim`}>
            <Sparkles size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            India's Student Tech Community
          </span>
          <h1 className={styles.title}>
            Unleash Your Code at <br />
            <span className="text-gradient-clip">Hacknfinity</span>
          </h1>
          <p className={styles.description}>
            A vibrant ecosystem of developers, designers, and creators. We organize hackathons, build open-source projects, and help you land top tech internships and jobs.
          </p>
          
          <div className={styles.ctas}>
            <Link href="/auth" className="btn-primary">
              Join Community <ArrowRight size={18} />
            </Link>
            <Link href="/events" className="btn-secondary">
              Register for Events
            </Link>
          </div>
        </div>
      </section>

      {/* Community Statistics */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="section-padding">
        <div className="container">
          <h2 className={styles.sectionTitle}>Featured Events & Hackathons</h2>
          <p className={styles.sectionDesc}>
            Join our upcoming events to learn, compete, build, and win exciting prizes.
          </p>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              Loading awesome events...
            </div>
          ) : featuredEvents.length > 0 ? (
            <div className={styles.eventGrid}>
              {featuredEvents.map((event) => (
                <div key={event._id} className={`${styles.eventCard} glass-panel glass-panel-hover`}>
                  <div className={styles.eventImageWrapper}>
                    <img src={event.image} alt={event.title} className={styles.eventImage} />
                    <span className={styles.eventTag}>{event.type}</span>
                  </div>
                  <div className={styles.eventBody}>
                    <span className={styles.eventDate}>
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <h3 className={styles.eventTitle}>{event.title}</h3>
                    <p className={styles.eventText}>
                      {event.description.length > 150 
                        ? `${event.description.substring(0, 150)}...` 
                        : event.description}
                    </p>
                    <div className={styles.eventFooter}>
                      <span className={styles.eventVenue} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} /> {event.venue}
                      </span>
                      <Link href={`/events/${event._id}`} className="btn-secondary" style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '12px' }}>
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', background: 'var(--bg-card)', borderRadius: '16px' }}>
              Stay tuned! More events are heading your way very soon.
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link href="/events" className="btn-secondary">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors & Partners Marquee */}
      <section className={`${styles.partnersSection} section-padding`} style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ fontSize: '26px', marginBottom: '40px' }}>Sponsors & Partners</h2>
          <div className="marquee-container">
            <div className="marquee-content">
              {/* Double up elements to create seamless infinite scroll */}
              {[...partners, ...partners].map((partner, index) => (
                <div key={index} className="marquee-item">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container">
          <h2 className={styles.sectionTitle}>What Our Hackers Say</h2>
          <p className={styles.sectionDesc}>
            Hear from members who transformed their developer journey through Hacknfinity.
          </p>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((test, index) => (
              <div key={index} className={`${styles.testimonialCard} glass-panel`}>
                <p className={styles.quoteText}>"{test.text}"</p>
                <div className={styles.authorInfo}>
                  <img src={test.image} alt={test.name} className={styles.authorImg} />
                  <div>
                    <h4 className={styles.authorName}>{test.name}</h4>
                    <span className={styles.authorTitle}>{test.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
