const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['core-team', 'volunteer', 'speaker', 'campus-ambassador', 'partner'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  github: String,
  linkedin: String,
  portfolio: String,
  resumeUrl: String,
  // flexible container for role-specific questions
  questions: {
    type: Map,
    of: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);
