// import React, { useState } from "react";
// import {
//   Modal,
//   Typography,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Button,
// } from "@mui/material";
// import { useContacts } from "../contexts/ContactsProvider";
// import { useConversations } from "../contexts/ConversationsProvider";

// export default function NewConversationModal({ closeModal }) {
//   const [selectedContactIds, setSelectedContactIds] = useState([]);
//   const { contacts } = useContacts();
//   const { createConversation } = useConversations();

//   function handleSubmit(e) {
//     e.preventDefault();

//     createConversation(selectedContactIds);
//     closeModal();
//   }

//   function handleCheckboxChange(contactId) {
//     setSelectedContactIds((prevSelectedContactIds) => {
//       if (prevSelectedContactIds.includes(contactId)) {
//         return prevSelectedContactIds.filter((prevId) => {
//           return contactId !== prevId;
//         });
//       } else {
//         return [...prevSelectedContactIds, contactId];
//       }
//     });
//   }

//   return (
//     <Modal open onClose={closeModal}>
//       <div>
//         <Typography variant="h6">Create Conversation</Typography>
//         <div>
//           <form onSubmit={handleSubmit}>
//             <FormGroup>
//               {contacts.map((contact) => (
//                 <FormControlLabel
//                   key={contact.id}
//                   control={
//                     <Checkbox
//                       checked={selectedContactIds.includes(contact.id)}
//                       onChange={() => handleCheckboxChange(contact.id)}
//                     />
//                   }
//                   label={contact.name}
//                 />
//               ))}
//             </FormGroup>
//             <Button type="submit" variant="contained" color="primary">
//               Create
//             </Button>
//           </form>
//         </div>
//       </div>
//     </Modal>
//   );
// }
