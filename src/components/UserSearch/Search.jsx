import React, { useState } from 'react';
import * as userService from '../../utilities/users-api';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const results = await userService.searchUsers(searchTerm);
      console.log(results)
      setSearchResults(results);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
    setIsLoading(false);
  };

  const handleAddFriend = async (userId) => {
    try {
      console.log(`Adding ${userId} as a friend`);
    } catch (error) {
      console.error('Failed to add friend:', error);
    }
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
            <button onClick={() => handleAddFriend(user._id)}>Add Friend</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;