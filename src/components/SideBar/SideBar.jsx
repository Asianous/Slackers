import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Button,
  Modal,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import MessagesSideBar from "../MessagesSideBar/MessagesSideBar";
import Contacts from "../Contacts/Contacts";
import NewContactModal from "../NewContact/NewContact";
import NewMessageModal from "../NewMessage/NewMessage";
import * as userService from "../../utilities/users-service";
import UserSearch from "../UserSearch/Search";
import { Link } from "react-router-dom";

const MESSAGES_KEY = "messages";
const CONTACTS_KEY = "contacts";
const USER_SEARCH_KEY = "userSearch";

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
        <Tab label="User Search" value={USER_SEARCH_KEY} />
      </Tabs>

      <Box
        sx={{
          p: 0,
          position: "absolute",
          bottom: 10,
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
        sx={{
          p: 0,
          position: "absolute",
          bottom: 46,
          width: "100%",
          borderBottom: 1,
          borderColor: "grey.300",
        }}
      >
        <Typography variant="body2">
          Logged in as: <span className="text-muted">{user.name}</span>
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
      >
        {activeTab === MESSAGES_KEY ? <MessagesSideBar /> : <Contacts />}
      </Box>
    </Paper>
  );
}
