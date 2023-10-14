const express = require("express");
const router = express.Router();
const { Conversation, User, Message, Sequelize } = require("../models");
const { getIO } = require("../services/socket");

// Get all Conversations
router.get("/user/:id", async (req, res) => {
  Conversation.findAll({
    where: { contacts: { [Sequelize.Op.contains]: [req.params.id] } },
  })
    .then(async (conversations) => {
      let conversationsWithUsers = [];
      if (!!conversations && conversations.length > 0) {
        conversationsWithUsers = await Promise.all(
          conversations.map(async (conversation) => {
            const contactUserObjects = await User.findAll({
              where: {
                id: conversation.contacts,
              },
            });
            let messages = await Message.findAll({
              where: { conversationId: conversation.id },
              order: [["updatedAt", "DESC"]],
              limit: 1,
            });
            conversation = {
              ...JSON.parse(JSON.stringify(conversation)),
              contacts: contactUserObjects,
              messages,
            };
            return conversation;
          }),
        );
      }
      res.json({ result: conversationsWithUsers });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Get a specific Conversation
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const conversation = await Conversation.findByPk(id, {
      include: "messages",
    });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    let contacts = await User.findAll({ where: { id: conversation.contacts } });
    res.json({
      result: { ...JSON.parse(JSON.stringify(conversation)), contacts },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// remove from group Conversation
router.post("/remove", async (req, res) => {
  try {
    console.log(req.body);
    const conversation = await Conversation.findByPk(req.body.id, {
      include: "messages",
    });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    conversation.update({
      contacts: conversation.contacts.filter((c) => c !== req.body.userId),
    });
    let contacts = await User.findAll({ where: { id: conversation.contacts } });
    let result = { ...JSON.parse(JSON.stringify(conversation)), contacts };
    getIO().emit("conversationUpdate", { conversation: result });
    res.json({
      result,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new Conversation
router.post("/new", async (req, res) => {
  try {
    let conversation = req.body;
    console.log(req.body);
    let c = await Conversation.create(conversation);
    let result = await Conversation.findByPk(c.id, {
      include: "messages",
    });
    let message = "Conversation Created Successfully!";
    let contacts = await User.findAll({ where: { id: result.contacts } });
    res.json({
      status: 200,
      result: { ...JSON.parse(JSON.stringify(result)), contacts },
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Update a Conversation
router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  let conversation = req.body;
  try {
    const result = await Conversation.findByPk(id);
    if (!result) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    await result.update(conversation);
    res.json({ result: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a Conversation
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const conversation = await Conversation.findByPk(id);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    await conversation.destroy();
    res.json({ message: "Conversation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
