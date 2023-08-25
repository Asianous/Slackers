import React, { useState } from "react";
import * as userService from "../../utilities/users-api";
import {
  Autocomplete,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material/";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const results = await userService.searchUsers(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
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
            <Button variant="contained">+</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Search;
