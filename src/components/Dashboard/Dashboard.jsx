import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import { useState } from "react";
import { getUser } from "../../utilities/users-service";
import Message from "../../components/Messages/Messages";
import { Box } from "@mui/system";

export default function Dashboard() {
  const [user, setUser] = useState(getUser());
  return (
    <Box sx={{ display: "flex", height: "98vh" }}>
      <SideBar user={user} setUser={setUser} />
      <Message />
    </Box>
  );
}
