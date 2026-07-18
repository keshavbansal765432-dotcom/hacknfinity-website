const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const User = require('../models/User');
const verifyToken = require('../middleware/auth');

// @route   GET /api/certificates/verify/:certificateId
// @desc    Verify a certificate by certificateId code
// @access  Public
router.get('/verify/:certificateId', async (req, res) => {
  const certId = req.params.certificateId.trim().toUpperCase();
  
  try {
    const certificate = await Certificate.findOne({ certificateId: certId });
    
    if (!certificate) {
      return res.status(404).json({ 
        verified: false, 
        message: 'Certificate not found. Please double check the ID code.' 
      });
    }

    res.json({
      verified: true,
      certificate
    });
  } catch (error) {
    console.error('Error verifying certificate:', error.message);
    res.status(500).json({ message: 'Server error verifying certificate' });
  }
});

// @route   POST /api/certificates/issue-test
// @desc    Issue a test certificate for demonstration (dev only)
// @access  Private
router.post('/issue-test', verifyToken, async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ message: 'Action not allowed in production' });
  }

  const { eventName, type } = req.body;
  const { name, email, uid } = req.user;

  try {
    const user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate unique cert code
    const randCode = Math.floor(100000 + Math.random() * 900000);
    const certId = `HACK-2026-${randCode}`;

    const newCert = new Certificate({
      certificateId: certId,
      userName: name || user.name,
      userEmail: email || user.email,
      eventName: eventName || 'Hacknfinity Winter Hackathon',
      type: type || 'participation',
      downloadUrl: `/api/certificates/download/${certId}`
    });

    await newCert.save();

    // Link to user profile
    user.certificates.push(newCert._id);
    await user.save();

    res.status(201).json({
      message: 'Test certificate successfully issued!',
      certificate: newCert
    });
  } catch (error) {
    console.error('Error issuing test certificate:', error.message);
    res.status(500).json({ message: 'Server error issuing certificate' });
  }
});

module.exports = router;
