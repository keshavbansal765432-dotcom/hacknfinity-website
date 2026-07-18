const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST /api/contact
// @desc    Submit a contact form query
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please enter name, email, and message.' });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      subject: subject || 'General Query',
      message
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Your message has been received! We will get back to you shortly.'
    });
  } catch (error) {
    console.error('Error in contact form submission:', error.message);
    res.status(500).json({ message: 'Server error saving query' });
  }
});

module.exports = router;
