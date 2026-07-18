'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Search } from 'lucide-react';
import { api } from '@/lib/api';
import styles from './page.module.css';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await api.getEvents();
        setEvents(data);
        setFilteredEvents(data);
      } catch (err) {
        console.error('Failed to load events:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    let result = [...events];

    // Filter by Tab
    if (activeTab === 'upcoming') {
      result = result.filter(e => !e.isPast && new Date(e.date) >= new Date());
    } else if (activeTab === 'past') {
      result = result.filter(e => e.isPast || new Date(e.date) < new Date());
    } else if (activeTab === 'hackathons') {
      result = result.filter(e => e.type === 'hackathon');
    } else if (activeTab === 'events') {
      result = result.filter(e => e.type === 'event');
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(query) || 
        e.description.toLowerCase().includes(query) ||
        e.venue.toLowerCase().includes(query)
      );
    }

    setFilteredEvents(result);
  }, [activeTab, searchQuery, events]);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'events', label: 'Workshops & Talks' }
  ];

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Header */}
      <section className={styles.header}>
        <div className="neon-glow-bg" style={{ top: '10%', left: '30%' }}></div>
        <div className="container">
          <h1 className={styles.title}>Events & Hackathons</h1>
          <p className={styles.subtitle}>
            Explore and participate in hackathons, web development workshops, tech talks, and open-source bootcamps.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container">
        {/* Search & Filter Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
          {/* Search bar */}
          <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
            <input
              type="text"
              placeholder="Search events, topics, or venues..."
              className="form-input"
              style={{ paddingLeft: '44px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>

          {/* Filter Tabs */}
          <div className={styles.filterContainer}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`${styles.filterBtn} ${activeTab === tab.id ? styles.activeFilter : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            Fetching the latest events and hackathons...
          </div>
        ) : filteredEvents.length > 0 ? (
          /* Cards Grid */
          <div className={styles.grid}>
            {filteredEvents.map((event) => (
              <div key={event._id} className={`${styles.card} glass-panel glass-panel-hover`}>
                <div className={styles.imageWrapper}>
                  <img src={event.image} alt={event.title} className={styles.image} />
                  <span className={styles.typeBadge} style={{ 
                    color: event.type === 'hackathon' ? 'var(--accent-cyan)' : 'var(--accent-violet)',
                    borderColor: event.type === 'hackathon' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(124, 58, 237, 0.3)'
                  }}>
                    {event.type}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardDate}>
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <h3 className={styles.cardTitle}>{event.title}</h3>
                  <p className={styles.cardDesc}>
                    {event.description.length > 140 
                      ? `${event.description.substring(0, 140)}...` 
                      : event.description}
                  </p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardVenue} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} /> {event.venue}
                    </span>
                    <Link href={`/events/${event._id}`} className="btn-secondary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px' }}>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div style={{ 
            textAlign: 'center', 
            padding: '80px 40px', 
            background: 'var(--bg-card)', 
            borderRadius: '16px', 
            border: '1px solid var(--border-glass)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No events found</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              We couldn't find any events matching your search or filters. Try adjusting them!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
