import React, { useState } from "react";
import * as userService from "../../utilities/users-api";
import {
  Autocomplete,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Typography,
} from "@mui/material/";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const results = await userService.searchUsers(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleAddUser = (user) => {
    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
  };

  const handleRemoveUser = (userToRemove) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((user) => user !== userToRemove)
    );
  };

  return (
    <div className="search-container">
      <Autocomplete
        freeSolo
        sx={{ width: 280 }}
        options={searchResults.map((user) => user.name)}
        onInputChange={(event, newValue) => {
          setSearchTerm(newValue);
          handleSearch();
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      />
      <List>
        {searchResults.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={user.name} />
            <Button variant="contained" onClick={() => handleAddUser(user)}>
              +
            </Button>
          </ListItem>
        ))}
      </List>
      <div>
        <Typography>Selected User(s):</Typography>
        <div>
          {selectedUsers.map((user, index) => (
            <Chip
              key={index}
              label={user.name}
              variant="outlined"
              onDelete={() => handleRemoveUser(user)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
