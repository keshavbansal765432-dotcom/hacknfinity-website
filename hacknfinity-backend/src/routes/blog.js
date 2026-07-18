const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// @route   GET /api/blogs
// @desc    Get all blog posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    res.status(500).json({ message: 'Server error fetching blog posts' });
  }
});

// @route   GET /api/blogs/:slug
// @desc    Get a single blog post by its slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog details:', error.message);
    res.status(500).json({ message: 'Server error fetching blog details' });
  }
});

module.exports = router;
