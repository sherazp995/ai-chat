const express = require('express');
const router = express.Router();
const { sign } = require('jsonwebtoken');
const passwordHash = require('password-hash');
const { User } = require('../models');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ result: users });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific user
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ result: user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new user
router.post("/register", async (req, res) => {
  try {
    let user = req.body;
    let result = await User.findOne({ where: { email: user.email } });
    let message = '';
    if (result) {
      message = 'User Already Exist!';
    }
    else {
      user.password = passwordHash.generate(user.password);
      result = await User.create(user);
      message = 'User Created Successfully!';
    }
    console.log(message)
    res.json({ status: 200, result, message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Update a user
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  let user = req.body;
  try {
    const result = await User.findByPk(id);
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    await result.update(user);
    res.json({ result: result });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    let result = await User.findOne({ where: { email: req.body.email } });

    if (result) {
      if (passwordHash.verify(req.body.password, result.password)) {
        let jwt = sign({ _id: result["_id"] }, process.env.privateKey);
        res.json({ status: 200, result, jwt, message: 'Successfully logged in' });
      }
      else {
        res.json({ status: 500, message: 'Incorrect password' });
      }
    }
    else {
      res.json({ status: 500, message: 'User does not exist' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;