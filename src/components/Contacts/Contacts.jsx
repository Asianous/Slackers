import React from "react";

export default function Contacts({ contacts }) {
  console.log("Contacts in Contacts component:", contacts);

  return (
    <div align="left">
      <h2>Contacts</h2>
      <ul>
  {contacts.map((contact, idx) => (
    <li key={idx}>
      {contact.name}
      <button onClick={() => handleRemoveFriend(contact._id)}>Remove</button>
    </li>
  ))}
</ul>

    </div>
  );
}
