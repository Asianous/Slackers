// SideBar.jsx
import React, { useState } from 'react';
import { Tabs, Tab, Button, Modal, Typography, Paper, Box } from "@mui/material";
import MessagesSideBar from "../MessagesSideBar/MessagesSideBar";
import Contacts from "../Contacts/Contacts";
import NewContactModal from '../NewContact/NewContact';
import NewMessageModal from '../NewMessage/NewMessage';
import * as userService from "../../utilities/users-service";
import UserSearch from "../UserSearch/Search";
import { Link } from "react-router-dom";

const MESSAGES_KEY = "messages";
const CONTACTS_KEY = "contacts";
const USER_SEARCH_KEY = "userSearch";

export default function SideBar({ user, setUser }) {
  const [activeTab, setActiveTab] = useState(MESSAGES_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]); // State to store contacts

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

  // Function to add a new friend to contacts
  const handleAddFriend = (newFriend) => {
    setContacts((prevContacts) => [...prevContacts, newFriend]);
    closeModal(); // Close the modal after adding a friend
  };

  return (
    <Paper style={{ width: "250px", position: "relative" }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        centered
      >
        <Tab label="Messages" value={MESSAGES_KEY} />
        <Tab label="Contacts" value={CONTACTS_KEY} />
      </Tabs>

      <Box p={0} position="absolute" bottom={0} width="100%">
        <Button
          onClick={openModal}
          color="primary"
          variant="contained"
          fullWidth
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
        p={0}
        position="absolute"
        bottom={40}
        width="100%"
        borderBottom={1}
        borderColor="grey.300"
      >
        <Typography variant="body2">
          Logged in as: <span className="text-muted">{user.name}</span>
          <Button>
            <Link to="/profile">Profile</Link>
          </Button>
        </Typography>
        <Button to="" onClick={handleLogOut}>
          Log Out
        </Button>
      </Box>
      <Box className="border-right overflow-auto flex-grow-1">
        {activeTab === MESSAGES_KEY ? <MessagesSideBar /> : (
          activeTab === CONTACTS_KEY ? <Contacts contacts={contacts} /> : <UserSearch closeModal={closeModal} onAddFriend={handleAddFriend} />
        )}
      </Box>
    </Paper>
  );
}
