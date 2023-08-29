import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { updatePassword } from '../../utilities/users-service';

function UserProfile() {
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitChangePassword = async (event) => {
    event.preventDefault();

    try {
      const response = await updatePassword({ oldPassword, newPassword });
      setSuccessMessage('Password updated successfully.');
      setErrorMessage('');
      setOldPassword('');
      setNewPassword('');
      setShowChangePasswordForm(false);
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Failed to update password. Please try again.');
    }
  };

  const handleGoBack = () => {
    setShowChangePasswordForm(false);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleGoBackHome = () => {
    window.history.back();
  };

  return (
    <div className="user-profile">
      <Button
        onClick={handleGoBackHome}
        variant="contained"
        fullWidth
        style={{
          backgroundColor: '#ADA9FC',
          color: 'white',
          marginTop: '2vmin',
        }}
      >
        Home Page
      </Button>

      {!showChangePasswordForm && (
        <Button
          onClick={() => setShowChangePasswordForm(true)}
          variant="contained"
          fullWidth
          style={{
            backgroundColor: '#ADA9FC',
            color: 'white',
            marginTop: '2vmin',
          }}
        >
          Change Password
        </Button>
      )}

      {showChangePasswordForm && (
        <form onSubmit={handleSubmitChangePassword}>
          <TextField
            label="Old Password"
            variant="outlined"
            type="password"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            fullWidth
            sx={{ marginBottom: '1rem', marginTop: '2vmin' }}
          />
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            fullWidth
            sx={{ marginBottom: '1rem' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <Button
              onClick={handleGoBack}
              variant="contained"
              style={{
                backgroundColor: '#ADA9FC',
                color: 'white',
                width: '48%',
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: '#ADA9FC',
                color: 'white',
                width: '48%',
              }}
            >
              Submit New Password
            </Button>
          </div>
        </form>
      )}

      <Typography
        variant="body2"
        sx={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '2vmin',
          color: 'green',
          marginTop: '2vmin',
        }}
      >
        {successMessage}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '2vmin',
          color: 'red',
          marginTop: '2vmin',
        }}
      >
        {errorMessage}
      </Typography>
    </div>
  );
}

export default UserProfile;
