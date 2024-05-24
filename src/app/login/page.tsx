'use client';
import { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save tokens or handle as needed
        console.log('Logged in successfully:', data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Box sx={styles.fullScreen}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4">Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleLogin} sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;

const styles = {
  fullScreen: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
