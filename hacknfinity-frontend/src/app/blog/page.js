'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Clock } from 'lucide-react';
import { api } from '@/lib/api';
import styles from './page.module.css';

const MOCK_BLOGS = [
  { _id: '1', title: 'Announcing Hacknfinity National Hackathon 2026!', content: 'We are thrilled to launch the details of the biggest hackathon in Hacknfinity history...', author: 'Abhinav Kumar', category: 'community-news', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', slug: 'announcing-national-hackathon-2026', readTime: '3 min read', createdAt: '2026-07-15' },
  { _id: '2', title: 'A Deep Dive into Modern CSS Grid & Flexbox', content: 'Vanilla CSS remains the gold standard for flexibility and performance. In this article we cover...', author: 'Tech Team Lead', category: 'tech-article', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80', slug: 'deep-dive-vanilla-css-layouts', readTime: '6 min read', createdAt: '2026-07-02' },
  { _id: '3', title: 'Recap: Hacknfinity Summer Hackathon 2025', content: 'What an incredible event! Over 300 students collaborated in Chennai to build SDG projects...', author: 'Community Manager', category: 'event-recap', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', slug: 'recap-summer-hackathon-2025', readTime: '4 min read', createdAt: '2025-07-16' },
  { _id: '4', title: 'Getting Started with Web3 Development', content: 'Web3 is transforming how developers build apps. In this beginner guide...', author: 'Vikram Seth', category: 'tech-article', image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80', slug: 'getting-started-web3', readTime: '7 min read', createdAt: '2026-06-20' },
  { _id: '5', title: 'Open Source Sprint Recap — 120 PRs Merged!', content: 'During our October Open Source Sprint, 120 pull requests were successfully merged...', author: 'Aditay Sinha', category: 'event-recap', image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80', slug: 'open-source-sprint-recap', readTime: '5 min read', createdAt: '2025-10-22' },
  { _id: '6', title: 'Hacknfinity Crosses 10,000 Community Members!', content: 'We hit the 10K milestone — a huge thank you to everyone who has been part of this journey!', author: 'Abhinav Kumar', category: 'community-news', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80', slug: 'celebrating-10k-members', readTime: '2 min read', createdAt: '2026-07-10' }
];

const CATEGORY_MAP = {
  'all': 'All',
  'community-news': 'Community News',
  'tech-article': 'Tech Articles',
  'event-recap': 'Event Recaps'
};

const CATEGORY_COLORS = {
  'community-news': '#10b981',
  'tech-article': '#8b5cf6',
  'event-recap': '#06b6d4'
};

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getBlogs();
        setBlogs(data.length > 0 ? data : MOCK_BLOGS);
      } catch {
        setBlogs(MOCK_BLOGS);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = activeFilter === 'all' ? blogs : blogs.filter(b => b.category === activeFilter);

  return (
    <div style={{ paddingBottom: '100px' }}>
      <section className={styles.header}>
        <div className="neon-glow-bg" style={{ top: '10%', left: '30%' }}></div>
        <div className="container">
          <h1 className={styles.title}>Hacknfinity Blog</h1>
          <p className={styles.subtitle}>Event recaps, tech deep-dives, and community announcements from the Hacknfinity team.</p>
        </div>
      </section>

      <div className="container">
        <div className={styles.filterContainer}>
          {Object.entries(CATEGORY_MAP).map(([key, label]) => (
            <button key={key} className={`${styles.filterBtn} ${activeFilter === key ? styles.activeFilter : ''}`} onClick={() => setActiveFilter(key)}>
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Loading articles...</div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((blog) => (
              <Link href={`/blog/${blog.slug}`} key={blog._id} className={`${styles.card} glass-panel glass-panel-hover`}>
                <div className={styles.imageWrapper}>
                  <img src={blog.image} alt={blog.title} className={styles.cardImage} />
                  <span className={styles.categoryBadge} style={{ background: `${CATEGORY_COLORS[blog.category]}22`, color: CATEGORY_COLORS[blog.category], border: `1px solid ${CATEGORY_COLORS[blog.category]}44` }}>
                    {CATEGORY_MAP[blog.category]}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{blog.title}</h3>
                  <p className={styles.cardExcerpt}>{blog.content.substring(0, 120)}...</p>
                  <div className={styles.cardMeta}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '13px' }}>
                      <BookOpen size={14} /> {blog.author}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '13px' }}>
                      <Clock size={14} /> {blog.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
