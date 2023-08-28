const message = require("../../models/message");

module.exports = {
  addMessage,
  indexMessage,
};

async function indexMessage(req, res) {
  try {
    const messages = await message.find({});
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function addMessage(req, res) {
  try {
    const newMessage = await message.create(req.body);
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json(err);
  }
}
