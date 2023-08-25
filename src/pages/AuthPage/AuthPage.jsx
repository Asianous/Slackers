import { useState } from 'react';
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
      <Button
        variant="contained"
        fullWidth
        onClick={() => setShowSignUp(!showSignUp)}
        style={{ marginTop: '3vmin', backgroundColor: '#ADA9FC', color: 'white', width: '50%', marginLeft: 'auto', marginRight: 'auto'}}
      >
        {showSignUp ? 'Switch to Log In' : 'Switch to Sign Up'}
      </Button>
      {showSignUp ? <SignUpForm setUser={setUser} /> : <LoginForm setUser={setUser} />}
    </main>
  );
}
