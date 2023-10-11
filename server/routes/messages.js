const express = require('express');
const router = express.Router();
const { Message } = require('../models');
const { runPrompt } = require('../services/openai')

// Get all Messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: 'sender'
    });
    res.json({ result: messages });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all Messages by Conversation
router.get('/conversation/:id', async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: {conversationId: req.params.id},
      include: 'sender'
    });
    res.json({ result: messages });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get a specific Message
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByPk(id, {
      include: 'sender',
    });
    if (!message) {
      return res.status(404).json({ error: 'message not found' });
    }
    res.json({ result: message });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new Message
router.post("/new", async (req, res) => {
  try {
    let message = req.body;
    // message.aiResponse = await runPrompt(message.content);
    console.log(message);
    let c = await Message.create(message);
    let result = await Message.findByPk(c.id, {
      include: 'sender'
    })
    res.json({ status: 200, result, message: 'Message Created Successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Update a Message
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  let message = req.body;
  try {
    const result = await Message.findByPk(id, {
      include: 'sender'
    });
    if (!result) {
      return res.status(404).json({ error: 'Message not found' });
    }
    await result.update(message);
    res.json({ result: result });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a Message
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    await message.destroy();
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;