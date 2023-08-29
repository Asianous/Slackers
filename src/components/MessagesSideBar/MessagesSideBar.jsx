import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemButton } from "@mui/material";

export default function MessageSideBar({ socket }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.emit("getRooms");

    socket.on("updatedRooms", (roomList) => {
      setRooms(roomList);
    });

    return () => {
      socket.off("updatedRooms");
    };
  }, [socket]);

  return (
    <div>
      <h2>Rooms</h2>
      <List>
        {rooms.map((roomId) => (
          <ListItem disablePadding key={roomId}>
            <ListItemButton>{roomId}</ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
