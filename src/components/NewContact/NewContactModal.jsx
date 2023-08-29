// import React from "react";
// import { Modal, Typography, Button } from "@mui/material";

// export default function NewContactModal({
//   isOpen,
//   onClose,
//   searchResults,
//   handleAddFriend,
// }) {
//   return (
//     <Modal open={isOpen} onClose={onClose}>
//       <div
//         style={{
//           background: "white",
//           padding: "20px",
//           maxWidth: "400px",
//           margin: "auto",
//           marginTop: "100px",
//         }}
//       >
//         <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
//           Add Friend
//         </Typography>
//         <ul>
//           {searchResults.map((user) => (
//             <li key={user.userId}>
//               {user.name}
//               <Button
//                 variant="outlined"
//                 onClick={() => handleAddFriend(user.userId)}
//                 sx={{ marginLeft: 2 }}
//               >
//                 Add Friend
//               </Button>
//             </li>
//           ))}
//         </ul>
//         <Button variant="contained" onClick={onClose}>
//           Close
//         </Button>
//       </div>
//     </Modal>
//   );
// }
