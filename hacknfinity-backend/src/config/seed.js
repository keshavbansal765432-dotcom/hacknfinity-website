const mongoose = require('mongoose');
const Event = require('../models/Event');
const Blog = require('../models/Blog');
const Certificate = require('../models/Certificate');

const mockEvents = [
  {
    title: 'Hacknfinity National Hackathon 2026',
    description: 'The flagship 36-hour national hackathon of Hacknfinity, bringing together the country\'s brightest minds to build innovative solutions for real-world problems. Partnered with top tech companies, offering internship opportunities, mentorship sessions, and a massive prize pool.',
    type: 'hackathon',
    date: new Date('2026-10-15T09:00:00Z'),
    venue: 'Hacker\'s Den, Bengaluru & Virtual',
    registrationLink: 'https://hacknfinity-national-2026.devpost.com',
    registrationDeadline: new Date('2026-10-05T23:59:59Z'),
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    prizePool: '₹2,50,000 + Sponsor APIs & Gadgets',
    timeline: [
      { time: '10:00 AM, Oct 15', title: 'Opening Ceremony', description: 'Kickoff, keynotes, and release of problem statements.' },
      { time: '12:00 PM, Oct 15', title: 'Hacking Begins', description: 'Teams start coding. Mentor allocations and first check-ins.' },
      { time: '09:00 PM, Oct 15', title: 'First Pitch Review', description: 'Optional feedback from mentors on initial prototypes.' },
      { time: '09:00 AM, Oct 16', title: 'Mid-way Submission', description: 'Teams submit their milestones and git repos.' },
      { time: '10:00 PM, Oct 16', title: 'Final Coding Submission', description: 'Coding stops. Code freeze and project submissions close.' },
      { time: '10:00 AM, Oct 17', title: 'Judging & Pitches', description: 'Live demos, Q&A rounds with the panel of judges.' },
      { time: '04:00 PM, Oct 17', title: 'Awards Ceremony', description: 'Winner announcements and prize distributions.' }
    ],
    faqs: [
      { question: 'Who can participate?', answer: 'Any undergraduate student currently enrolled in an Indian university. Solo hackers or teams of up to 4 members are welcome.' },
      { question: 'Is there a registration fee?', answer: 'No! Registration is completely free for all shortlisted teams. Free meals, drinks, and cool swag are provided on-site.' },
      { question: 'What is the theme?', answer: 'It is an open-theme hackathon with tracks in AI/ML, Web3 & Blockchain, FinTech, and Healthcare.' }
    ],
    isPast: false,
    galleryImages: []
  },
  {
    title: 'Advanced AI & Agentic Workflows Workshop',
    description: 'Learn how to build autonomous agentic architectures using the latest AI models and developer tools. This hands-on workshop covers LangChain, vector databases, tool-use systems, and deployment options. Led by industry experts and core team members.',
    type: 'event',
    date: new Date('2026-08-25T14:00:00Z'),
    venue: 'Online via Zoom & Discord',
    registrationLink: 'https://hacknfinity.org/workshops/ai-agents',
    registrationDeadline: new Date('2026-08-24T23:59:59Z'),
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    prizePool: '',
    timeline: [
      { time: '02:00 PM', title: 'Introduction to AI Agents', description: 'Understanding agentic reasoning and LLM orchestration.' },
      { time: '03:00 PM', title: 'Building Tools', description: 'Teaching agents to query APIs, search databases, and edit files.' },
      { time: '04:00 PM', title: 'Hands-on Lab', description: 'Creating and launching a collaborative multi-agent project.' }
    ],
    faqs: [
      { question: 'Do I need prior AI knowledge?', answer: 'Basic programming skills in Python or JavaScript are recommended, but we will start from the basics of prompting and APIs.' },
      { question: 'Will certificates be provided?', answer: 'Yes, all attendees will receive a verified digital certificate of completion linked to their member dashboard.' }
    ],
    isPast: false,
    galleryImages: []
  },
  {
    title: 'Intro to Open Source Contribution & Git',
    description: 'A beginner-friendly session on Git fundamentals, GitHub collaboration workflow, and contributing to open-source software. Organised during Hacktoberfest, students successfully submitted their first pull requests and won exclusive swags.',
    type: 'event',
    date: new Date('2025-10-18T10:00:00Z'),
    venue: 'College Seminar Hall & YouTube Live',
    registrationLink: '',
    registrationDeadline: new Date('2025-10-17T23:59:59Z'),
    image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80',
    prizePool: '',
    timeline: [],
    faqs: [],
    isPast: true,
    galleryImages: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'Hacknfinity Summer Hackathon 2025',
    description: 'Our annual summer hackathon focused on sustainable development goals (SDGs). Over 300 students built and submitted 75+ innovative solutions to tackle climate change, education accessibility, and clean energy.',
    type: 'hackathon',
    date: new Date('2025-07-12T09:00:00Z'),
    venue: 'Tech Park Auditorium, Chennai',
    registrationLink: '',
    registrationDeadline: new Date('2025-07-05T23:59:59Z'),
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    prizePool: '₹1,50,000 Cash Prizes',
    timeline: [],
    faqs: [],
    isPast: true,
    galleryImages: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

const mockBlogs = [
  {
    title: 'Announcing Hacknfinity National Hackathon 2026!',
    content: 'We are thrilled to launch the details of the Hacknfinity National Hackathon 2026. This year, we are scaling up with bigger prizes, direct interview pipelines with recruiters, and specialized tracks in GenAI, DevTools, and Web3. Registration opens soon on our web portal, and developers will be able to apply and form teams. Prepare your ideas and get ready to hack!',
    author: 'Founder & President',
    category: 'community-news',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    slug: 'announcing-national-hackathon-2026',
    readTime: '3 min read',
    createdAt: new Date('2026-07-15T12:00:00Z')
  },
  {
    title: 'A Deep Dive into Building Modern UI with Vanilla CSS Grid and Flexbox',
    content: 'While utility frameworks are highly popular, vanilla CSS remains the gold standard for flexibility and performance. In this article, we cover how to master modern layout properties like Grid, Flexbox, custom properties, and backdrop-filter to build outstanding premium visual states. We will walk through building an interactive component from scratch using responsive media and CSS transitions.',
    author: 'Technical Team Lead',
    category: 'tech-article',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    slug: 'deep-dive-vanilla-css-layouts',
    readTime: '6 min read',
    createdAt: new Date('2026-07-02T10:00:00Z')
  },
  {
    title: 'Recap: Hacknfinity Summer Hackathon 2025 Highlights',
    content: 'What an incredible event! The Summer Hackathon 2025 brought 300+ students together in Chennai to collaborate on SDG-oriented projects. We saw projects tracking solar grid distribution using Web3 and micro-loans platforms for women entrepreneurs. Congratulations to Team Eco-Grid for securing the first prize! Here is a recap of the key highlights, photos, and team projects.',
    author: 'Community Manager',
    category: 'event-recap',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    slug: 'recap-summer-hackathon-2025',
    readTime: '4 min read',
    createdAt: new Date('2025-07-16T18:00:00Z')
  }
];

const mockCertificates = [
  {
    certificateId: 'HACK-2026-111111',
    userName: 'Jane Doe',
    userEmail: 'jane.doe@gmail.com',
    eventName: 'Hacknfinity National Hackathon 2026',
    issueDate: new Date('2026-07-18T10:00:00Z'),
    type: 'participation',
    downloadUrl: ''
  },
  {
    certificateId: 'HACK-2026-222222',
    userName: 'John Smith',
    userEmail: 'john.smith@gmail.com',
    eventName: 'Hacknfinity Summer Hackathon 2025',
    issueDate: new Date('2025-07-15T12:00:00Z'),
    type: 'winner',
    downloadUrl: ''
  }
];

const seedDatabase = async () => {
  try {
    // Seed Events
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.insertMany(mockEvents);
      console.log('Seeded Events successfully.');
    }

    // Seed Blogs
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.insertMany(mockBlogs);
      console.log('Seeded Blogs successfully.');
    }

    // Seed Certificates
    const certCount = await Certificate.countDocuments();
    if (certCount === 0) {
      await Certificate.insertMany(mockCertificates);
      console.log('Seeded Certificates successfully.');
    }
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

module.exports = seedDatabase;
