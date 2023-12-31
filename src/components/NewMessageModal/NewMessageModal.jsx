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
import Messages from "../Messages/Messages";
import { createMessage } from "../../utilities/message-api";

export default function NewMessageModal({ closeModal, socket, user }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const socketRef = useRef(socket);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSelectUser = (user) => {
    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user.name]);
    // console.log("NewMessageModal: Selected users:", selectedUsers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      content: message,
      sender: user.name,
      recipients: selectedUsers,
    };

    // Emit the message to the server, which will handle room creation
    socketRef.current.emit("newConvo", newMessage);

    // Clear the input fields after emitting the message
    setMessage("");
    setSelectedUsers([]);
    setMessageSent(true);
    closeModal();
    createMessage(newMessage);
  };
  // console.log("NewMessageModal: Emitting new message:", newMessage);

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
