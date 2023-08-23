const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const socketIO = require("socket.io"); // Import Socket.IO
require("dotenv").config();
require("./config/database");

const app = express();
// const server = require('http').Server(app); // Create an HTTP server

app.use(logger("dev"));
app.use(express.json());
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));
app.use(require("./config/checkToken"));

const port = process.env.PORT || 3001;

app.use("/api/users", require("./routes/api/users"));
app.use("/api/message", require("./routes/api/message"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//User Find
app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  const users = await User.find({ name: { $regex: query, $options: 'i' } });
  res.json(users);
});


const server = app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});

const io = require("./config/socket").init(server);

io.on("connection", (socket) => {
  socket.on("newMessage", (msg) => {
    socket.broadcast.emit("newMessage", msg);
  });
  console.log(`${socket.id} is connected`);

  socket.on("disconnect", () => {
    console.log(`${socket.id} has disconnected`);
  });
});
