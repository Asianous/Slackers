import React, { useState } from 'react';
import Search from '../UserAutoFill/UserAutoFill';
import * as userService from '../../utilities/users-api';

export default function Contacts({ contacts }) {
  const [addedFriends, setAddedFriends] = useState([]);

  const handleSelectRecipient = async (selectedRecipient) => {
    try {
      const response = await userService.addFriend(selectedRecipient);
      setAddedFriends((friends) => [...friends, response.friend]);
    } catch (error) {
      console.error('Failed to add friend:', error);
    }
  };

  return (
    <div align="left">
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>{contact.name}</li>
        ))}
      </ul>
      <Search onSelectRecipient={handleSelectRecipient} />
      <div>
        <h2>Added Friends</h2>
        <ul>
          {addedFriends.map((friend) => (
            <li key={friend.id}>{friend.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
