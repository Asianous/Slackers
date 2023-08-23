import React, { useState } from 'react';
import { Tabs, Tab, Button, Modal, Typography, Paper, Box } from "@mui/material";
import Messages from "../Messages/Messages";
import Contacts from "../Contacts/Contacts";
import NewContactModal from '../NewContact/NewContact';
import NewMessageModal from '../NewMessage/NewMessage';
import * as userService from "../../utilities/users-service";

const MESSAGES_KEY = "messages";
const CONTACTS_KEY = "contacts";

export default function SideBar({ user, setUser }) {
  const [activeTab, setActiveTab] = useState(MESSAGES_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const messageOpen = activeTab === MESSAGES_KEY;

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

  return (
    <Paper style={{ width: "250px", height: "95vh", position: "relative" }}>
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
          variant="outlined"
          fullWidth
        >
          New {messageOpen ? "Message" : "Contact"}
        </Button>
        <Modal open={modalOpen} onClose={closeModal}>
          {messageOpen ? (
            <NewMessageModal closeModal={closeModal} />
          ) : (
            <NewContactModal closeModal={closeModal} />
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
        </Typography>
        <Button to="" onClick={handleLogOut}>
          Log Out
        </Button>
      </Box>
      <Box className="border-right overflow-auto flex-grow-1">
        {activeTab === MESSAGES_KEY ? <Messages /> : <Contacts />}
      </Box>
    </Paper>
  );
}
