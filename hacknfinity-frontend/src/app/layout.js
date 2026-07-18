import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Hacknfinity - India\'s Student Tech Community',
  description: 'Hacknfinity is India\'s premier student developer community focused on hackathons, workshops, coding events, and professional tech networks. Join the wave of innovation today.',
  keywords: ['Hacknfinity', 'student tech community', 'hackathons', 'coding workshops', 'developer community India', 'learn programming', 'student hackathons'],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 80px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
