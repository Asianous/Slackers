// SideBar.jsx
import React, { useState } from 'react';
import { Tabs, Tab, Button, Modal, Typography, Paper, Box } from "@mui/material";
import MessagesSideBar from "../MessagesSideBar/MessagesSideBar";
import Contacts from "../Contacts/Contacts";
import NewContactModal from '../NewContact/NewContact';
import NewMessageModal from "../NewMessageModal/NewMessageModal";
import * as userService from "../../utilities/users-service";
import UserSearch from "../UserSearch/Search";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Messages from "../Messages/Messages";
import { Room, RoomOutlined } from "@mui/icons-material";

const MESSAGES_KEY = "messages";
const CONTACTS_KEY = "contacts";
const USER_SEARCH_KEY = "userSearch";

export default function SideBar({ user, setUser, socket }) {
  const [activeTab, setActiveTab] = useState(MESSAGES_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]); // State to store contacts
  const [selectedRoom, setSelectedRoom] = useState(null);

  const theme = createTheme({
    palette: {
      lightPurple: {
        main: "#ADA9FC",
        light: "#c4c2fd",
        dark: "#7e78fa",
        contrastText: "#242105",
      },
      primary: {
        main: "#ADA9FC",
        light: "#c4c2fd",
        dark: "#7e78fa",
        contrastText: "#242105",
      },
    },
  });

  const handleSelectRoom = (roomId) => {
    setSelectedRoom(roomId);
  };

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
    <ThemeProvider theme={theme}>
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
          textColor="primary"
          indicatorColor="primary"
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
            variant="contained"
            fullWidth
            sx={{ borderRadius: 0 }}
            color="lightPurple"
          >
            New {activeTab === MESSAGES_KEY ? "Message" : "Contact"}
          </Button>
          <Modal open={modalOpen} onClose={closeModal}>
            {activeTab === MESSAGES_KEY ? (
              <NewMessageModal
                socket={socket}
                user={user}
                closeModal={closeModal}
              />
            ) : (
              <UserSearch
                closeModal={closeModal}
                onAddFriend={handleAddFriend}
              />
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
          <Typography color="primary.dark" variant="body2">
            Logged in as: {user.name}
            <Button
              color="lightPurple"
              fullWidth
              component={Link}
              to="/profile"
            >
              Profile
            </Button>
          </Typography>
          <Button fullWidth color="lightPurple" onClick={handleLogOut}>
            Log Out
          </Button>
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
            <MessagesSideBar
              onSelectRoom={handleSelectRoom}
              socket={socket}
              roomId={selectedRoom}
            />
          ) : activeTab === CONTACTS_KEY ? (
            <Contacts contacts={contacts} />
          ) : (
            <UserSearch closeModal={closeModal} onAddFriend={handleAddFriend} />
          )}

          {selectedRoom && <Messages socket={socket} roomId={selectedRoom} />}
        </Box>
      </Paper>
    </ThemeProvider>
  );
}
