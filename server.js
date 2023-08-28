const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const socketIO = require("socket.io"); // Import Socket.IO
const userRoutes = require("./routes/api/users");
const { v4: uuidv4 } = require("uuid");
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
app.use("/api/messages", require("./routes/api/messages"));
app.use("/api/search", require("./routes/api/search"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});

const io = require("./config/socket").init(server);

const connectedSockets = {};
const rooms = {};

io.on("connection", (socket) => {
  const roomId = uuidv4();
  console.log(`${socket.id} is connected`);
  connectedSockets[socket.id] = socket;

  socket.on("newConvo", (data) => {
    console.log("NEW MSG DATA", data);
    socket.join(roomId);

    rooms[roomId] = {
      participants: [data.sender, ...data.recipients],
    };

    // if (connectedSockets[data.recipient]) {
    //   connectedSockets[data.recipient].emit("newMessage", data);
    // }
    // socket.emit("newMessage", data, roomId);
    io.to(roomId).emit("newConvo", data, roomId);

    io.emit("updatedRooms", Object.keys(rooms));
  });

  socket.on("getRooms", () => {
    socket.emit("updatedRooms", Object.keys(rooms));
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} has disconnected`);
    delete connectedSockets[socket.id];
  });
});
