import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import {
  List,
  ListItem,
  TextField,
  Paper,
  InputAdornment,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { createMessage } from "../../utilities/message-api";

export default function Messages({ selectedUser, socket, user }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(socket);

  useEffect(() => {
    socket.on("newMessage", (data) => {
      console.log("Received new message:", data.content);
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
      // recipients: selectedUsers,
    };

    // Emit the message along with the selected recipient through the socket
    socketRef.current.emit("newMessage", newMessage);

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
      <List>
        {messages.map((msg, idx) => (
          <ListItem
            key={idx}
            style={msg.sender === user.name ? { color: "green" } : {}}
          >
            {msg.content}
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          onChange={handleChange}
          value={message}
          placeholder="Start Typing..."
          fullWidth
          multiline
          rows={5}
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
