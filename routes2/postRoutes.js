
const express = require('express');
const router = express.Router();
const User = require('../models2/Usermodel.js');
const Post = require('../models2/Postmodels');

// Middleware to check if user is an admin
const isAdmin = async (req, res, next) => {

  const user = await User.findByPk(req.body.userId);

  if (user.role === 'admin') {
    next(); 
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
};

// Route for adding a new post (only accessible by admin)
router.post('/', isAdmin, async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route for retrieving all posts
router.get('/', async (req, res) => {
  try {
    const post = await Post.findAll();

    res.send(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route for updating a post by ID (only accessible by admin)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post.update(req.body);
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route for deleting a post by ID (only accessible by admin)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post.destroy();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
