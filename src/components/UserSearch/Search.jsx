import React, { useState } from 'react';
import './Search.css';
import * as userService from '../../utilities/users-api';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const results = await userService.searchUsers(searchTerm); // Ensure searchUsers is exported from users-service
      console.log(results)
      setSearchResults(results);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search for users..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {isLoading && <p>Loading...</p>}

      <ul>
        {searchResults.map((user, index) => (
          <li key={index}>
            {user.name}
            <button>Add Friend</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;