import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import * as usersService from "../../utilities/users-service";

export default function LoginForm({ setUser, showSignUp, setShowSignUp }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (evt) => {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError("Log In Failed - Try Again");
    }
  };

  const handleSwitchToSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <TextField
                label="Email"
                variant="outlined"
                type="text"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                sx={{ width: "30%" }} // Adjust the width as needed
              />
            </Grid>
            <Grid item>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                sx={{ width: "30%" }} // Adjust the width as needed
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#ADA9FC",
              color: "white",
              marginTop: "1rem",
            }}
          >
            LOG IN
          </Button>
        </form>
      </div>
      <div style={{ marginTop: "2vmin" }}>
        <Button
          variant="contained"
          onClick={handleSwitchToSignUp}
          style={{
            backgroundColor: "#ADA9FC",
            color: "white",
          }}
        >
          Sign Up
        </Button>
      </div>
      <Typography
        variant="body2"
        sx={{
          fontFamily: "Arial, sans-serif",
          fontSize: "2vmin",
          color: "red",
          marginTop: "2vmin",
        }}
      >
        &nbsp;{error}
      </Typography>
    </div>
  );
}
