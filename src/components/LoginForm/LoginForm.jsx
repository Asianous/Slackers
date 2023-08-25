import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (evt) => {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '1rem', marginTop: '2vmin' }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '1rem' }}
          />
          <Button type="submit" variant="contained" fullWidth style={{ backgroundColor: '#ADA9FC', color: 'white' }}>
            LOG IN
          </Button>
        </form>
      </div>
      <Typography variant="body2" sx={{ fontFamily: 'Arial, sans-serif', fontSize: '2vmin', color: 'red', marginTop: '2vmin' }}>
        &nbsp;{error}
      </Typography>
    </div>
  );
}
