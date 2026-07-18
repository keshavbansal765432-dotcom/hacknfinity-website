const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// @route   POST /api/applications
// @desc    Submit an application form (Core Team, Volunteer, Campus Ambassador, Speaker, Partner)
// @access  Public (or Private with Token, let's keep it public for easy submission from landing forms, or verify if token exists)
router.post('/', async (req, res) => {
  const { type, name, email, phone, github, linkedin, portfolio, resumeUrl, questions } = req.body;

  if (!type || !name || !email || !phone) {
    return res.status(400).json({ message: 'Please provide all required fields (type, name, email, phone).' });
  }

  try {
    const newApplication = new Application({
      type,
      name,
      email,
      phone,
      github,
      linkedin,
      portfolio,
      resumeUrl,
      questions: questions || {}
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: `Your application for ${type.replace('-', ' ')} has been submitted successfully! Our team will contact you soon.`,
      application: newApplication
    });
  } catch (error) {
    console.error('Error submitting application:', error.message);
    res.status(500).json({ message: 'Server error submitting application.' });
  }
});

module.exports = router;
