'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import styles from './page.module.css';

export default function Team() {
  const [activeCategory, setActiveCategory] = useState('all');

  const team = [
    // Leadership
    {
      name: 'Abhinav Kumar',
      role: 'Founder & President',
      category: 'leadership',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200',
      linkedin: 'https://www.linkedin.com/in/codewithabhinav/',
      github: 'https://github.com',
      twitter: 'https://twitter.com'
    },
    {
      name: 'Aditay Sinha',
      role: 'Co-Founder & VP',
      category: 'leadership',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com'
    },
    {
      name: 'Vikram Seth',
      role: 'Community Manager',
      category: 'leadership',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    },
    // Technical Team
    {
      name: 'Amit Patel',
      role: 'Technical Lead',
      category: 'technical',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com'
    },
    {
      name: 'Divya Iyer',
      role: 'Frontend Developer',
      category: 'technical',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    },
    {
      name: 'Kartik Nair',
      role: 'Backend Developer',
      category: 'technical',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    },
    // Design
    {
      name: 'Riya Sen',
      role: 'Design Lead (UI/UX)',
      category: 'design',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    },
    {
      name: 'Kabir Dev',
      role: 'Graphic Designer',
      category: 'design',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&h=200',
      linkedin: 'https://linkedin.com'
    },
    // Outreach & Event Management
    {
      name: 'Siddharth Rao',
      role: 'Outreach Lead',
      category: 'outreach',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&h=200',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Pooja Hegde',
      role: 'Event Management Lead',
      category: 'events',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&h=200',
      linkedin: 'https://linkedin.com'
    },
    // Media, Photo, Video
    {
      name: 'Varun Dhawan',
      role: 'Video Editing Lead',
      category: 'media',
      avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=200&h=200',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Isha Gupta',
      role: 'Photography Lead',
      category: 'media',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Manish Malhotra',
      role: 'Social Media Manager',
      category: 'media',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Core Members' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'technical', label: 'Tech Team' },
    { id: 'design', label: 'Design' },
    { id: 'outreach', label: 'Outreach & Partners' },
    { id: 'events', label: 'Event Management' },
    { id: 'media', label: 'Media & Socials' }
  ];

  const filteredTeam = activeCategory === 'all' 
    ? team 
    : team.filter(member => member.category === activeCategory);

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Header */}
      <section className={styles.header}>
        <div className="neon-glow-bg" style={{ top: '10%', left: '30%' }}></div>
        <div className="container">
          <h1 className={styles.title}>Meet the Core Team</h1>
          <p className={styles.subtitle}>
            The dreamers, designers, builders, and organizers behind Hacknfinity's active operations.
          </p>
        </div>
      </section>

      {/* Main Grid Section */}
      <div className="container">
        {/* Categories Bar */}
        <div className={styles.categoryContainer}>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.activeCategory : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        <div className={styles.grid}>
          {filteredTeam.map((member, idx) => (
            <div key={idx} className={`${styles.card} glass-panel glass-panel-hover`}>
              <img src={member.avatar} alt={member.name} className={styles.avatar} />
              <div>
                <h3 className={styles.name}>{member.name}</h3>
                <span className={styles.role}>{member.role}</span>
              </div>
              
              {/* Social Links */}
              <div className={styles.socials}>
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
                {member.github && (
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                )}
                {member.twitter && (
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}