import React from 'react';

export default function Contacts({ contacts }) {
  return (
    <div align="left">
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>{contact.name}</li>
        ))}
      </ul>
    </div>
  );
}
