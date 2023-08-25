import React, { Component } from 'react';
import { signUp } from '../../utilities/users-service';
import { Button, TextField } from '@mui/material';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { name, email, password } = this.state;
      const formData = { name, email, password };
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;

    const errorMessageStyle = {
      fontFamily: 'Arial, sans-serif',
      color: 'red',
      fontsize: '2vmin',
    };

    return (
      <div>
        <div className="form-container">
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={disable}
              fullWidth
              style={{ marginTop: '1rem', backgroundColor: '#ADA9FC', color: 'white' }}
            >
              SIGN UP
            </Button>
          </form>
        </div>
        <p className="error-message" style={errorMessageStyle}>&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
