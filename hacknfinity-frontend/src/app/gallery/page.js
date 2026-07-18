'use client';

import { useState } from 'react';
import { X, Play } from 'lucide-react';
import styles from './page.module.css';

const PHOTOS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80', alt: 'Hackathon Opening' },
  { id: 2, src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80', alt: 'Team Collaboration' },
  { id: 3, src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', alt: 'Workshop Session' },
  { id: 4, src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', alt: 'Hackathon Coding' },
  { id: 5, src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', alt: 'Award Ceremony' },
  { id: 6, src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', alt: 'Group Photo' },
  { id: 7, src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', alt: 'Networking Event' },
  { id: 8, src: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80', alt: 'AI Workshop' },
  { id: 9, src: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80', alt: 'Open Source Sprint' }
];

const VIDEOS = [
  { id: 1, thumb: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', title: 'Hacknfinity National Hackathon 2025 - Full Recap', duration: '12:34' },
  { id: 2, thumb: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80', title: 'AI & Agentic Workflows Workshop Highlights', duration: '8:22' },
  { id: 3, thumb: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80', title: 'Summer Hackathon 2025 - Behind the Scenes', duration: '15:08' }
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filters = ['all', 'photos', 'videos'];

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Header */}
      <section className={styles.header}>
        <div className="neon-glow-bg" style={{ top: '10%', left: '30%' }}></div>
        <div className="container">
          <h1 className={styles.title}>Gallery</h1>
          <p className={styles.subtitle}>Relive our best moments — hackathons, workshops, celebrations, and everything in between.</p>
        </div>
      </section>

      <div className="container">
        {/* Filter Tabs */}
        <div className={styles.filterContainer}>
          {filters.map(f => (
            <button key={f} className={`${styles.filterBtn} ${activeFilter === f ? styles.activeFilter : ''}`} onClick={() => setActiveFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        {(activeFilter === 'all' || activeFilter === 'photos') && (
          <div className={styles.photosGrid}>
            {PHOTOS.map((photo) => (
              <div key={photo.id} className={styles.photoCard} onClick={() => setLightbox(photo)}>
                <img src={photo.src} alt={photo.alt} className={styles.photoImg} />
                <div className={styles.photoOverlay}>
                  <span className={styles.photoLabel}>{photo.alt}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos Grid */}
        {(activeFilter === 'all' || activeFilter === 'videos') && (
          <>
            <h2 style={{ fontSize: '28px', fontWeight: '700', margin: '60px 0 24px' }}>Event Videos</h2>
            <div className={styles.videosGrid}>
              {VIDEOS.map((video) => (
                <div key={video.id} className={`${styles.videoCard} glass-panel glass-panel-hover`}>
                  <div className={styles.videoThumb}>
                    <img src={video.thumb} alt={video.title} className={styles.videoThumbImg} />
                    <div className={styles.playOverlay}>
                      <div className={styles.playBtn}><Play size={24} fill="white" /></div>
                    </div>
                    <span className={styles.duration}>{video.duration}</span>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', lineHeight: '1.4' }}>{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className={styles.lightboxOverlay} onClick={() => setLightbox(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)}><X size={24} /></button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} className={styles.lightboxImg} />
            <p className={styles.lightboxCaption}>{lightbox.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
}
