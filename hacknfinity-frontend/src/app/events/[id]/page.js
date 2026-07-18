'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, MapPin, Trophy, Clock, ChevronDown, ChevronUp, Check, AlertTriangle } from 'lucide-react';
import { api } from '@/lib/api';
import { subscribeToAuth } from '@/lib/firebase';
import styles from './page.module.css';

export default function EventDetails({ params }) {
  const router = useRouter();
  const { id } = use(params); // Unwrapping params in Next.js 15+
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  useEffect(() => {
    // Track auth state
    const unsubscribeAuth = subscribeToAuth((currentUser) => {
      setUser(currentUser);
    });

    async function loadEventDetails() {
      try {
        const data = await api.getEventDetails(id);
        setEvent(data);
        
        // If user logged in, check if they are already registered
        if (user) {
          const profile = await api.getProfile();
          const isReg = profile.registeredEvents.some(e => e._id === id || e === id);
          setRegistered(isReg);
        }
      } catch (err) {
        console.error('Failed to load event details:', err);
      } finally {
        setLoading(false);
      }
    }

    loadEventDetails();
    return () => unsubscribeAuth();
  }, [id, user]);

  const handleRegister = async () => {
    if (!user) {
      // Redirect to login if not logged in
      router.push('/auth');
      return;
    }

    setRegistering(true);
    setMessage({ text: '', type: '' });

    try {
      await api.registerForEvent(id);
      setRegistered(true);
      setMessage({ text: '🎉 Successfully registered for this event! Check your Member Dashboard.', type: 'success' });
    } catch (err) {
      setMessage({ text: err.message || 'Failed to register.', type: 'error' });
    } finally {
      setRegistering(false);
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', color: 'var(--text-muted)' }}>
        Loading event details...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Event Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>We couldn't find the event you are looking for.</p>
        <Link href="/events" className="btn-primary">
          <ArrowLeft size={16} /> Back to Events
        </Link>
      </div>
    );
  }

  const isDeadlinePassed = new Date() > new Date(event.registrationDeadline);

  return (
    <div className={styles.container}>
      <Link href="/events" className={styles.backLink}>
        <ArrowLeft size={16} /> Back to Events
      </Link>

      <div className={styles.layout}>
        {/* Left main content column */}
        <div>
          <span className={styles.typeBadge}>{event.type}</span>
          <h1 className={styles.title}>{event.title}</h1>
          
          <img src={event.image} alt={event.title} className={styles.bannerImage} />

          <div className={styles.detailSection}>
            <h2 className={styles.sectionHeading}>About the Event</h2>
            <p className={styles.text}>{event.description}</p>
          </div>

          {/* Timeline / Schedule */}
          {event.timeline && event.timeline.length > 0 && (
            <div className={styles.detailSection}>
              <h2 className={styles.sectionHeading}>Event Timeline</h2>
              <div className={styles.timelineWrapper}>
                {event.timeline.map((item, idx) => (
                  <div key={idx} className={styles.timelineItem}>
                    <div className={styles.timelineDot}></div>
                    <div className={styles.timelineTime}>{item.time}</div>
                    <h3 className={styles.timelineTitle}>{item.title}</h3>
                    <p className={styles.timelineDesc}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Accordion */}
          {event.faqs && event.faqs.length > 0 && (
            <div className={styles.detailSection}>
              <h2 className={styles.sectionHeading}>Frequently Asked Questions</h2>
              <div style={{ marginTop: '20px' }}>
                {event.faqs.map((faq, idx) => (
                  <div key={idx} className={styles.faqItem}>
                    <div className={styles.faqQuestion} onClick={() => toggleFaq(idx)}>
                      <span>{faq.question}</span>
                      {openFaqIdx === idx ? <ChevronDown size={18} style={{ transform: 'rotate(180deg)', transition: '0.2s' }} /> : <ChevronDown size={18} style={{ transition: '0.2s' }} />}
                    </div>
                    {openFaqIdx === idx && (
                      <p className={styles.faqAnswer}>{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar details & register column */}
        <div>
          <div className={`${styles.sidebarCard} glass-panel`}>
            <h3 className={styles.sidebarTitle}>Event Details</h3>

            {/* Prize pool callout */}
            {event.prizePool && (
              <div className={styles.prizePoolCard}>
                <span className={styles.prizeLabel}>Prize Pool</span>
                <span className={styles.prizeValue}>{event.prizePool}</span>
              </div>
            )}

            <div className={styles.infoItem}>
              <Calendar className={styles.infoIcon} size={20} />
              <div>
                <div className={styles.infoLabel}>Date & Time</div>
                <div className={styles.infoValue}>
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  <br />
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {new Date(event.date).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <MapPin className={styles.infoIcon} size={20} />
              <div>
                <div className={styles.infoLabel}>Venue</div>
                <div className={styles.infoValue}>{event.venue}</div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Clock className={styles.infoIcon} size={20} />
              <div>
                <div className={styles.infoLabel}>Registration Deadline</div>
                <div className={styles.infoValue} style={{ color: isDeadlinePassed ? 'var(--text-muted)' : 'var(--text-main)' }}>
                  {new Date(event.registrationDeadline).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>

            {/* Registration CTA button */}
            {registered ? (
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--accent-emerald)', color: 'var(--accent-emerald)' }} disabled>
                <Check size={18} /> Registered
              </button>
            ) : isDeadlinePassed ? (
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} disabled>
                Registration Closed
              </button>
            ) : (
              <button 
                onClick={handleRegister} 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={registering}
              >
                {registering ? 'Registering...' : user ? 'Register for Event' : 'Login to Register'}
              </button>
            )}

            {/* Alert Messages */}
            {message.text && (
              <div style={{ 
                padding: '12px 16px', 
                borderRadius: '8px', 
                fontSize: '13px',
                lineHeight: '1.4',
                background: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${message.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                color: message.type === 'success' ? 'var(--accent-emerald)' : '#ef4444'
              }}>
                {message.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
