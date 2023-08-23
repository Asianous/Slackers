import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
} from "@mui/material";

export default function MessagePage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  let socket;

  useEffect(() => {
    if (!socket) {
      socketRef.current = io();
    }
    socket = socketRef.current;
    socket.on("newMessage", (msg) => {
      setMessages((messages) => [...messages, msg]);
      console.log(msg);
    });
    return () => {
      socket.removeAllListeners("newMessage");
      socket.disconnect();
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setMessages((m) => [...m, message]);
    socketRef.current.emit("newMessage", message);
    setMessage("");
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <Container>
      <Typography variant="h1">Group Chat</Typography>
      <div>
        <List>
          {messages.map((msg, idx) => (
            <ListItem key={idx}>{msg}</ListItem>
          ))}
        </List>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            onChange={handleChange}
            value={message}
            placeholder="Start Typing..."
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </form>
      </div>
    </Container>
  );
};