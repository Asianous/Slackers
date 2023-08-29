import React, { useState } from 'react';
import { Modal, Typography, Button, Box } from '@mui/material';
import Search from '../UserAutoFill/UserAutoFill'; // Adjust the path as needed
import Contacts from '../Contacts/Contacts'; // Adjust the path as needed

export default function NewContact({ closeModal }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [contacts, setContacts] = useState([]); // Update this state as needed
  const [searchResults, setSearchResults] = useState([]); // Add this state for search results

  const openSearch = () => {
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  const handleAddFriend = (userId) => {
    // Fetch the user details based on the userId
    const selectedUser = searchResults.find((user) => user._id === userId);

    if (selectedUser) {
      // Check if the user is already in contacts
      const isAlreadyAdded = contacts.some((contact) => contact.id === selectedUser._id);

      if (!isAlreadyAdded) {
        // Add the user to contacts
        setContacts([...contacts, { id: selectedUser._id, name: selectedUser.name }]);
      }
    }

    closeModal();
  };

  return (
    <Modal open onClose={closeModal}>
      <Box sx={{ background: 'white', padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
        <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
          Create Contact
        </Typography>
        <Button variant="contained" onClick={openSearch}>
          Search for Users
        </Button>
        {searchOpen && <Search closeModal={closeSearch} onSelectRecipient={handleAddFriend} searchResults={searchResults} />}
        <Contacts contacts={contacts} /> {/* Render the Contacts component */}
        <Button variant="contained" onClick={closeModal}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

