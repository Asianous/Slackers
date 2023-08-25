import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
} from "@mui/material";
import Search from "../UserAutoFill/UserAutoFill";
import { io } from "socket.io-client";
import Messages from "../Messages/Messages";

export default function NewMessageModal({ closeModal }) {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
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

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleSelectRecipient = (selectedRecipient) => {
    setRecipient(selectedRecipient);
  };

  const handleSendMessage = () => {
    socketRef.current.emit("newMessage", messages);
    setMessage("");
    // Implement sending logic here
    console.log("Sending message:", messages);
    closeModal();
  };

  return (
    <Modal
      open={true}
      onClose={closeModal}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={{ p: 2, width: 300, backgroundColor: "white", borderRadius: 4 }}>
        <Typography variant="h6" gutterBottom>
          New Message
        </Typography>
        <Button>
          <Search onSelectRecipient={handleSelectRecipient} />
        </Button>
        <TextField
          sx={{ height: "100%", width: "100%" }}
          label="Start typing..."
          value={recipient}
          onChange={handleRecipientChange}
          fullWidth
          margin="normal"
          multiline
          rows={5}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" onClick={handleSendMessage}>
                  Send
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Modal>
  );
}
