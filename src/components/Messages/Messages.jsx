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
    if (message.trim() !== "") {
      setMessages((m) => [...m, message]);
      socketRef.current.emit("newMessage", message);
      setMessage("");
    }
  }

  const messagesContainerStyle = {
    // position: "fixed",
    bottom: 0,
    right: 0,
    // width: "60%",
    height: "95vh",
    padding: "10px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  };

  const textFieldStyle = {
    flexGrow: 1,
  };

  return (
    <Paper style={messagesContainerStyle}>
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
          style={textFieldStyle}
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
