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
import UserAutoFill from "../UserAutoFill/UserAutoFill";
import Messages from "../Messages/Messages";
import { createMessage } from "../../utilities/message-api";
import * as userService from "../../utilities/users-api";

export default function NewMessageModal({ closeModal, socket, user }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(socket);


  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io();
    }
    // Commented out the socket declaration inside the useEffect hook
    // const socket = socketRef.current;
    
    socketRef.current.on("newMessage", (msg) => {
      setMessages((messages) => [...messages, msg]);
      console.log(msg);
    });

    return () => {
      socketRef.current.removeAllListeners("newMessage");
      socketRef.current.disconnect();
    };
  }, []);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSelectUser = (user) => {
    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user.name]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      content: message,
      sender: user.name,
      recipients: selectedUsers,
    };

    // Emit the message along with the selected recipient through the socket
    socketRef.current.emit("newMessage", newMessage);

    setMessage("");
    setSelectedUsers([]);
    setMessageSent(true);
    closeModal();
    createMessage(newMessage);
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
        <>
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
        </>
      </Box>
    </Modal>
  );
}
