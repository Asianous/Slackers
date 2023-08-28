import React from "react";
import { useState } from "react";
import { getUser } from "../../utilities/users-service";
import { io } from "socket.io-client";
import SideBar from "../../components/SideBar/SideBar";
import Messages from "../../components/Messages/Messages";
import NavBar from "../../components/NavBar/NavBar";
import { Grid } from "@mui/material/";

export default function Dashboard({ user, setUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <Grid container sx={{ height: "95vh" }}>
      <Grid item xs={4} s={3} md={2}>
        <SideBar user={user} setUser={setUser} socket={socket} />
      </Grid>
      <Grid item xs={8} s={9} md={10}>
        <NavBar />
        <Messages
          messages={messages}
          setMessages={setMessages}
          socket={socket}
          user={user}
          roomId={selectedRoom}
        />
      </Grid>
    </Grid>
  );
}
