import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
} from "@mui/material";
import { io } from "socket.io-client";
import Messages from "../Messages/Messages";
import * as userService from "../../utilities/users-api";

export default function NewMessageModal({ closeModal }) {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [addedFriends, setAddedFriends] = useState([]);
  let socket;

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io();
    }
    const socket = socketRef.current;
    
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
