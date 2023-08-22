const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
require('dotenv').config();
require('./config/database');
const socketIO = require('socket.io'); // Import Socket.IO

const app = express();
const server = require('http').Server(app); // Create an HTTP server

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;

app.use('/api/users', require('./routes/api/users'));
app.use("/api/message", require("./routes/api/message"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const io = socketIO(server); // Initialize Socket.IO with the HTTP server

io.on("connection", (socket) => {
  // Listen for "newInteraction" event and update lastInteraction on the server
  socket.on("newInteraction", (userId) => {
    // Update the lastInteraction for the user with userId in your database
    // You need to implement this part using your database and user model
    console.log(`User ${userId} interacted with the app`);
  });

  socket.on("newMessage", (msg) => {
    socket.broadcast.emit("newMessage", msg);
  });
});

server.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
