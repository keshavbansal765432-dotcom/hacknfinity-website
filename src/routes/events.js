const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const verifyToken = require('../middleware/auth');

// @route   GET /api/events
// @desc    Get all events (including hackathons)
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Attempt to fetch with a date sort, fallback safely to an unsorted match if it fails
    let events;
    try {
      events = await Event.find().sort({ date: 1 });
    } catch (sortError) {
      console.warn('Warning: Sorting by date failed, fetching unsorted fallback fields:', sortError.message);
      events = await Event.find();
    }
    
    res.json(events || []);
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ message: `Server error fetching events: ${error.message}` });
  }
});

// @route   GET /api/events/:id
// @desc    Get a single event by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event details:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).json({ message: 'Server error fetching event details' });
  }
});

// @route   POST /api/events/:id/register
// @desc    Register current user for an event
// @access  Private
router.post('/:id/register', verifyToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (new Date() > new Date(event.registrationDeadline)) {
      return res.status(400).json({ message: 'Registration deadline has passed' });
    }

    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Check if already registered
    if (user.registeredEvents.includes(event._id)) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }

    // Add event to user's registered list
    user.registeredEvents.push(event._id);
    user.points = (user.points || 0) + 50; // Award points for participating
    await user.save();

    res.json({ message: 'Successfully registered for event!', user });
  } catch (error) {
    console.error('Error registering for event:', error.message);
    res.status(500).json({ message: 'Server error registering for event' });
  }
});

module.exports = router;