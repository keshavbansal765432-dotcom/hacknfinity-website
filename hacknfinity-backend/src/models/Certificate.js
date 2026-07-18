const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  eventName: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['participation', 'winner', 'appreciation'],
    default: 'participation'
  },
  downloadUrl: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
