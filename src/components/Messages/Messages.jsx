import { io } from "socket.io-client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { List, ListItem, TextField, Button } from "@mui/material";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  let socket;

  useEffect(() => {
    if (!socket) {
      socketRef.current = io();
    }
    socket = socketRef.current;
    // console.log("Socket connected", socketRef.current.connected);
    socket.on("newMessage", (msg) => {
      setMessages((messages) => [...messages, msg]);
      console.log(msg);
    });

    return () => {
      socket.removeAllListeners("newMessage");
      socket.disconnect();
    };
  }, []);

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessages((m) => [...m, message]);
    socketRef.current.emit("newMessage", message);
    setMessage("");
  }
  return (
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
          margin="normal"
          multiline
          rows={5}
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </form>
    </div>
  );
}
