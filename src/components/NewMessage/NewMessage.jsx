import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
} from "@mui/material";
import UserAutoFill from "../UserAutoFill/UserAutoFill";
import { io } from "socket.io-client";
import Messages from "../Messages/Messages";
import * as userService from "../../utilities/users-api";

export default function NewMessageModal({ closeModal }) {
  const [selectedUser, setSelectedUser] = useState("");
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

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user.name);
    console.log(user.name);
  };

  function handleSubmit(e) {
    e.preventDefault();

    // Emit the message along with the selected recipient through the socket
    socketRef.current.emit("newMessage", {
      selectedUser: selectedUser,
      message: message,
    });

    // Clear the input fields after emitting the message
    setMessage("");
    setSelectedUser("");

    console.log("MSG:", message);
    console.log("selectedUser:", selectedUser);
    closeModal();
  }

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
          <UserAutoFill handleSelectUser={handleSelectUser} />
        </Button>
        <TextField
          sx={{ height: "100%", width: "100%" }}
          label="Start typing..."
          value={message}
          onChange={handleMessageChange}
          fullWidth
          margin="normal"
          multiline
          rows={5}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" onClick={handleSubmit}>
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
