import { Shield, Users, Target, Rocket, Compass, Heart } from 'lucide-react';
import styles from './page.module.css';

export default function About() {
  const values = [
    {
      icon: <Rocket size={24} />,
      title: 'Innovation',
      desc: 'Encouraging students to think outside boundaries, build novel prototypes, and use cutting-edge technology stacks.'
    },
    {
      icon: <Users size={24} />,
      title: 'Inclusivity',
      desc: 'Open to developers of all backgrounds, domains, and skill levels. We welcome beginners with open arms.'
    },
    {
      icon: <Heart size={24} />,
      title: 'Community First',
      desc: 'Everything we organize is run by students, for students. Peer learning and support are our core strengths.'
    }
  ];

  const timelineItems = [
    {
      year: '2024',
      title: 'The Spark',
      desc: 'Started as a small group of passionate tech students wishing to bridge the industry-academia gap.'
    },
    {
      year: '2024',
      title: 'First Hackathon',
      desc: 'Organized our debut virtual hackathon with over 150 participants and 30+ project submissions.'
    },
    {
      year: '2025',
      title: 'Campus Ambassador Network',
      desc: 'Launched the CA program, expanding our footprint to 30+ colleges across India and hosting local bootcamps.'
    },
    {
      year: '2026',
      title: '10K Members & Beyond',
      desc: 'Grew into a fully-fledged tech ecosystem with active Discord servers, sponsorships, and national-level coding events.'
    }
  ];

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Page Header */}
      <section className={styles.aboutHeader}>
        <div className="neon-glow-bg" style={{ top: '10%', left: '40%' }}></div>
        <div className="container">
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.subtitle}>
            Hacknfinity is India's premier student developer community, dedicated to fostering innovation, learning, and networking.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            <div>
              <span className="text-gradient-clip" style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '13px' }}>
                Our Purpose
              </span>
              <h2 className={styles.heading} style={{ marginTop: '8px' }}>Mission & Vision</h2>
              <p className={styles.text}>
                Our mission is to empower student developers by providing them with a platform to learn, build, and collaborate. We aim to break down barriers to tech education and supply students with high-value resources, mentors, and networks.
              </p>
              <p className={styles.text}>
                We envision a future where every student, regardless of their background or branch of study, has the access, confidence, and tools to turn their ideas into working software.
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--accent-cyan)' }}><Target size={24} /></div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>Practical Learning</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Building real-world projects is the best way to master code. We emphasize practical buildups over dry theory.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--accent-violet)' }}><Compass size={24} /></div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>Mentorship Access</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Connecting students directly with industry tech professionals, CTOs, and seasoned developers for guidance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className={styles.section} style={{ background: 'rgba(12, 13, 22, 0.4)' }}>
        <div className="container">
          <h2 className={styles.heading} style={{ textAlign: 'center' }}>Our Core Values</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            These operating values guide our community guidelines, event selections, and core team decisions.
          </p>

          <div className={styles.valuesGrid}>
            {values.map((val, idx) => (
              <div key={idx} className={`${styles.valueCard} glass-panel`}>
                <div className={styles.valueIcon}>{val.icon}</div>
                <h3 className={styles.valueTitle}>{val.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.heading} style={{ textAlign: 'center' }}>Our Journey</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '500px', margin: '0 auto 40px auto' }}>
            A look back at how we started and how we have grown over the years.
          </p>

          <div className={styles.timeline}>
            {timelineItems.map((item, idx) => (
              <div key={idx} className={`${styles.timelineItem} ${idx % 2 === 0 ? styles.left : styles.right}`}>
                <div className={`${styles.timelineContent} glass-panel`}>
                  <div className={styles.timelineYear}>{item.year}</div>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className={styles.section} style={{ background: 'rgba(12, 13, 22, 0.4)' }}>
        <div className="container">
          <h2 className={styles.heading} style={{ textAlign: 'center', marginBottom: '40px' }}>Founder's Message</h2>
          <div className={`${styles.founderBox} glass-panel`}>
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200"
              alt="Hacknfinity Founder"
              className={styles.founderImage}
            />
            <div className={styles.founderInfo}>
              <h3 className={styles.founderName}>Abhinav Kumar</h3>
              <span className={styles.founderTitle}>Founder & President, Hacknfinity</span>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7', marginBottom: '16px' }}>
                "We started Hacknfinity with a simple realization: textbooks alone do not make you a software engineer. The magic happens when you get into a hackathon room, collaborate with peers, make mistakes, and build something from scratch. Hacknfinity is built to give every student that workspace. We want to democratize tech innovation and build a platform that stands for collaborative student developer growth across India."
              </p>
              <p style={{ color: 'var(--accent-cyan)', fontWeight: '600', fontSize: '15px' }}>
                Keep Hacking! 🚀
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
