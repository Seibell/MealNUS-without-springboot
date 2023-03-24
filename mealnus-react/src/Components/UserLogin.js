// UserLogin.js
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import About from './About';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    marginBottom: '16px',
  },
});

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const classes = useStyles();

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch(`http://localhost:8080/MealNUS-war/rest/User/userLogin?email=${email}&password=${password}`)
      .then(response => response.json())
      .then(data => {
        setLoggedIn(true);
        setUser(data);
      })
      .catch(error => {
        setError('Invalid email or password');
      });
  };

  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          User Login
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label="Email"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            className={classes.input}
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            className={classes.input}
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
        {error && (
          <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default UserLogin;