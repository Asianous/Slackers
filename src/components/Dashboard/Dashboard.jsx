import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import { useState } from "react";
import { getUser } from "../../utilities/users-service";
import Message from "../../components/Messages/Messages";
import Grid from "@mui/material/Grid";

export default function Dashboard() {
  const [user, setUser] = useState(getUser());

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={4} md={2}>
        <SideBar user={user} setUser={setUser} />
      </Grid>
      <Grid item xs={8} md={10}>
        <Message />
      </Grid>
    </Grid>
  );
}
