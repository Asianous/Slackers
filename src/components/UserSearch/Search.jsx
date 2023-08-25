import React, { useState } from 'react';
import {
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  Box,
} from '@mui/material';
import * as userService from '../../utilities/users-api';

export default function Search({ closeModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const results = await userService.searchUsers(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
    setIsLoading(false);
  };

  return (
    <Modal
      open={true}
      onClose={closeModal}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 400,
          backgroundColor: 'white',
          p: 3,
          borderRadius: 4,
          boxShadow: 4,
        }}
      >
        <Typography variant="h6">Search for Users</Typography>
        <TextField
          label="Search"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ marginTop: 2 }}
        >
          Search
        </Button>
        {isLoading && <p>Loading...</p>}
        <List sx={{ marginTop: 2 }}>
          {searchResults.map((user) => (
            <ListItem key={user._id}>
              <ListItemText primary={user.name} />
              <Button
                variant="outlined"
                // onClick={() => handleAddFriend(user._id)}
                sx={{ marginLeft: 2 }}
              >
                Add Friend
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
}
