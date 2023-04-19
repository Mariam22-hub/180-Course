// routes/user.js

const express = require('express');
const router = express.Router();
const  User  = require('../models2/Usermodel');

// Route for adding a new user
router.post('/', async (req, res) => {
  try {
    // const new_user = await User.create({
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password,
    //     role: req.body.role
    // });

    const new_user = await User.create(req.body);
    
    res.status(201).json(new_user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route for updating a user by ID
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Route for deleting a user by ID
router.delete('/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  module.exports = router;
  

  