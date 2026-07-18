const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['event', 'hackathon'],
    default: 'event'
  },
  date: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  registrationLink: {
    type: String,
    default: ''
  },
  registrationDeadline: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  prizePool: {
    type: String,
    default: ''
  },
  timeline: [{
    time: String,
    title: String,
    description: String
  }],
  faqs: [{
    question: String,
    answer: String
  }],
  isPast: {
    type: Boolean,
    default: false
  },
  galleryImages: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', EventSchema);
