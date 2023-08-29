import React from "react";
import { Box } from "@mui/material"; // Import Box for layout styling

export default function Contacts({ contacts, handleRemoveFriend }) {
  console.log("Contacts in Contacts component:", contacts);

  return (
    <div>
      <Box sx={{ paddingLeft: 2, paddingBottom: 2 }}>
        {/* Apply left padding and bottom padding */}
        <h2>Contacts</h2>
        <ul>
          {contacts.map((contact, idx) => (
            <li key={idx} sx={{ marginBottom: 1 }}>
              {/* Apply margin at the bottom of each contact */}
              {contact}
              <button onClick={() => handleRemoveFriend(contact._id)}>Remove</button>
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
}
