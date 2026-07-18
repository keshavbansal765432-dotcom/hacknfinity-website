const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/auth');

// Helper to generate a referral code
const generateReferralCode = (name) => {
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 5).toUpperCase();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${cleanName}${rand}`;
};

// @route   POST /api/auth/sync
// @desc    Sync Firebase authenticated user with MongoDB
// @access  Private
router.post('/sync', verifyToken, async (req, res) => {
  const { uid, email, name } = req.user;
  const { referralCodeUsed, profilePicture } = req.body;

  try {
    let user = await User.findOne({ firebaseUid: uid }).populate('registeredEvents').populate('certificates');
    
    if (user) {
      // Update existing user profile if needed
      if (profilePicture && user.profilePicture !== profilePicture) {
        user.profilePicture = profilePicture;
        await user.save();
      }
      return res.json(user);
    }

    // Create a new user profile
    const refCode = generateReferralCode(name || 'MEMBER');
    
    // Check if referred by someone else
    let referredByCode = '';
    if (referralCodeUsed) {
      const referrer = await User.findOne({ referralCode: referralCodeUsed.toUpperCase() });
      if (referrer) {
        referredByCode = referrer.referralCode;
        // Award points to referrer
        referrer.points = (referrer.points || 0) + 100;
        await referrer.save();
      }
    }

    // Assign a random leaderboard rank for MVP demonstration
    const totalUsers = await User.countDocuments();
    const rank = totalUsers + 1;

    user = new User({
      firebaseUid: uid,
      name: name || email.split('@')[0],
      email: email,
      profilePicture: profilePicture || '',
      referralCode: refCode,
      referredBy: referredByCode,
      leaderboardRank: rank,
      points: referredByCode ? 50 : 0 // Bonus points for using a referral
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error syncing user:', error.message);
    res.status(500).json({ message: 'Server error syncing user profile' });
  }
});

// @route   GET /api/auth/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid })
      .populate('registeredEvents')
      .populate('certificates');
      
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({ message: 'Server error fetching user profile' });
  }
});

module.exports = router;
