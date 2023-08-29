import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import {
  List,
  ListItem,
  TextField,
  Paper,
  InputAdornment,
  Button,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { createMessage } from "../../utilities/message-api";

export default function Messages({ selectedUser, socket, user }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(socket);

  useEffect(() => {
    socket.on("newConvo", (data, roomId) => {
      console.log("Received new message:", data, roomId);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Join the room based on the recipient's username
    socket.emit("joinRoom", socket.id, selectedUser);

    return () => {
      // Leave the room when the component unmounts
      socket.emit("leaveRoom", selectedUser);
    };
  }, [selectedUser]);

  function handleChange(e) {
    setMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      content: message,
      sender: user.name,
      recipients: selectedUser,
    };

    // Emit the message along with the selected recipient through the socket
    socketRef.current.emit("newConvo", newMessage);

    // Clear the input fields after emitting the message
    setMessage("");
    createMessage(newMessage);
  };

  const messagesContainerStyle = {
    bottom: 0,
    right: 0,
    height: "98vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  };

  return (
    <Paper style={messagesContainerStyle}>
      <List style={{ padding: 0 }}>
        {messages.map((msg, idx) => (
          <ListItem
            key={idx}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === user?.name ? "flex-end" : "flex-start",
              paddingBottom: "8px",
            }}
          >
            {/* Display sender's first letter in a circle */}
            <div
              style={{
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                background: msg.sender === user?.name ? "#DCF8C6" : "#F3F3F3",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "16px",
                marginRight: "10px",
              }}
            >
              {msg.sender[0].toUpperCase()}
            </div>

            {/* Message content */}
            <div
              style={{
                background: msg.sender === user?.name ? "#DCF8C6" : "#F3F3F3",
                padding: "10px 15px",
                borderRadius:
                  msg.sender === user?.name
                    ? "10px 0 10px 10px"
                    : "0 10px 10px 10px",
                maxWidth: "70%",
                wordWrap: "break-word",
              }}
            >
              <Typography
                variant="body1"
                style={{
                  whiteSpace: "pre-line",
                  fontSize: "20px",
                  lineHeight: "1.4",
                }}
              >
                {msg.content}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", marginTop: "10px" }}
      >
        <TextField
          type="text"
          onChange={handleChange}
          value={message}
          placeholder="Start Typing..."
          fullWidth
          multiline
          rows={1}
          style={{ flexGrow: 1, marginRight: "10px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  type="submit"
                  style={{ border: "none", background: "none" }}
                >
                  <SendIcon color="primary" />
                </Button>
              </InputAdornment>
            ),
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
      </form>
    </Paper>
  );
}
