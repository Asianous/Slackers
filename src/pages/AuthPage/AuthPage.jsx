import React, { useState } from 'react';
import { Button } from '@mui/material';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <main>
      <img
        src="https://lh3.googleusercontent.com/pw/AIL4fc_jjScx0Re4L0kycicvXQvVzp0FWSloeimCAWY5H8qSk-yShPakaklgGNzvM2aVEF0FS0GJ3BFuYNwGzP60ViUOP6FuaXd021pbdoklAxMDxGv5cYY=w2400"
        alt="Slackers"
        style={{
          width: '25%',
          height: 'auto',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 'auto'
        }}
      />
      {showSignUp ? <SignUpForm setUser={setUser} showSignUp={showSignUp} setShowSignUp={setShowSignUp} /> : <LoginForm setUser={setUser} showSignUp={showSignUp} setShowSignUp={setShowSignUp} />}
    </main>
  );
}
