import React, { Component } from "react";
import { signUp } from "../../utilities/users-service";
import { Button, TextField } from "@mui/material";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();

    // Validation
    const { name, email, password, confirm } = this.state;
    if (!name || !email || !password || !confirm) {
      this.setState({ error: "All fields are required" });
      return;
    }
    if (password !== confirm) {
      this.setState({ error: "Passwords Do Not Match" });
      return;
    }

    try {
      const formData = { name, email, password };
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;

    const errorMessageStyle = {
      fontFamily: "Arial, sans-serif",
      color: "red",
      fontSize: "2vmin",
    };

    const handleSwitchToLogIn = () => {
      this.props.setShowSignUp(!this.props.showSignUp);
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="form-container" style={{ marginBottom: "2vmin" }}>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirm"
              variant="outlined"
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <div style={{ display: "flex", gap: "1rem" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSwitchToLogIn}
                style={{
                  backgroundColor: "#ADA9FC",
                  color: "white",
                }}
              >
                Log In
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#ADA9FC",
                  color: "white",
                }}
              >
                SIGN UP
              </Button>
            </div>
          </form>
        </div>
        <p
          className="error-message"
          style={{ ...errorMessageStyle, marginTop: "2vmin" }}
        >
          {this.state.error}
        </p>
      </div>
    );
  }
}
