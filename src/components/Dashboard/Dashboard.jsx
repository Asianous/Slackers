import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import { useState } from "react";
import { getUser } from "../../utilities/users-service";
import Message from "../../components/Messages/Messages";
import Grid from "@mui/material/Grid";

export default function Dashboard({ user, setUser }) {
  // const [user, setUser] = useState(getUser());

  return (
    <Grid container sx={{ height: "95vh" }}>
      <Grid item xs={6} s={3} md={2}>
        <SideBar user={user} setUser={setUser} />
      </Grid>
      <Grid item xs={6} s={9} md={10}>
        <Message />
      </Grid>
    </Grid>
  );
}
