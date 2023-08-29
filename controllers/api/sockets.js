const Socket = require("../models/socket");
const User = require("../models/user");

module.exports = {
  updateSocket,
  createSocket,
};

async function updateSocket(req, res) {
  try {
    const user = await User.findById(req.user._id);
    const socket = await Socket.create(req.body);
    user.socket.push(socket._id);
    await user.save();
    res.status(201).json(socket);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function createSocket(req, res) {
  try {
    const socket = await Socket.create(req.body);
    res.status(201).json(socket);
  } catch (err) {
    res.status(400).json(err);
  }
}
