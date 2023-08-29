// SideBar.jsx
import React, { useState } from 'react';
import { Tabs, Tab, Button, Modal, Typography, Paper, Box } from "@mui/material";
import MessagesSideBar from "../MessagesSideBar/MessagesSideBar";
import Contacts from "../Contacts/Contacts";
import NewMessageModal from '../NewMessage/NewMessage';
import * as userService from "../../utilities/users-service";
import UserSearch from "../UserSearch/Search";
import { Link } from "react-router-dom";

const MESSAGES_KEY = "messages";
const CONTACTS_KEY = "contacts";

export default function SideBar({ user, setUser }) {
  const [activeTab, setActiveTab] = useState(MESSAGES_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  const handleAddFriend = (newFriend) => {
    console.log('Adding friend:', newFriend);
  
    if (!contacts.some((contact) => contact._id === newFriend)) {
      console.log('Friend not already in contacts, adding...');
      setContacts((contacts) => [...contacts, newFriend]);
    } else {
      console.log('Friend is already in contacts, not adding.');
    }

    closeModal();
  };

  return (
    <Paper
      sx={{
        maxWidth: 350,
        width: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "98vh",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        centered
      >
        <Tab label="Messages" value={MESSAGES_KEY} />
        <Tab label="Contacts" value={CONTACTS_KEY} />
      </Tabs>

      <Box
        sx={{
          p: 0,
          position: "absolute",
          bottom: 1,
          width: "100%",
        }}
      >
        <Button
          onClick={openModal}
          color="primary"
          variant="contained"
          fullWidth
          sx={{ borderRadius: 0 }}
        >
          New {activeTab === MESSAGES_KEY ? "Message" : "Contact"}
        </Button>
        <Modal open={modalOpen} onClose={closeModal}>
          {activeTab === MESSAGES_KEY ? (
            <NewMessageModal closeModal={closeModal} />
          ) : (
            <UserSearch closeModal={closeModal} onAddFriend={handleAddFriend} />
          )}
        </Modal>
      </Box>
      <Box
        sx={{
          p: 0,
          position: "absolute",
          bottom: 38,
          width: "100%",
          borderBottom: 1,
          borderColor: "grey.300",
        }}
      >
        <Typography variant="body2">
          Logged in as: {user.name}
          <Button component={Link} to="/profile">
            Profile
          </Button>
        </Typography>
        <Button onClick={handleLogOut}>Log Out</Button>
      </Box>

      <Box
        sx={{
          p: 1,
          position: "absolute",
          top: 60,
          bottom: 120,
          width: "100%",
          overflowY: "auto", // Allow content to scroll if necessary
        }}
      ></Box>
      <Box className="border-right overflow-auto flex-grow-1">
        {activeTab === MESSAGES_KEY ? (
          <MessagesSideBar />
        ) : activeTab === CONTACTS_KEY ? (
          <Contacts contacts={contacts} />
        ) : (
          <UserSearch closeModal={closeModal} onAddFriend={handleAddFriend} />
        )}
      </Box>
    </Paper>
  );
}
