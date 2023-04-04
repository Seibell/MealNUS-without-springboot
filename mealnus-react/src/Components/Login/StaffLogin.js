import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import mealNUSLogo from '../../Assets/MealNUS-Logo.png';
import PersonIcon from '@mui/icons-material/Person';
import '../../App.css';
import { AdminAuthContext } from "../../Context/AdminAuthContext";

const classes = {
  root: "container",
  form: "form",
  input: "input",
};


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        MealNUS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function StaffLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [staff, setStaff] = useState(null);
  const theme = createTheme();

  const { setCurrentStaff } = useContext(AdminAuthContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      `http://localhost:8080/MealNUS-war/rest/Staff/staffLogin?email=${email}&password=${password}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          setStaff(data);
          setCurrentStaff(data);
          console.log(data);
        } else {
          setError('Invalid email or password');
        }
      })
      .catch((error) => {
        setError('Invalid email or password');
      });
  };

  // useEffect(() => {
  //   if (currentStaff === null) {
  //     setLoggedIn(false);
  //   }
  // }, [currentStaff]);

  if (loggedIn) {
    return <Navigate to="/admindashboard" />;
  }

  return (
    <div className="healthy-food-background">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ marginBottom: '30px' }}>
              <img src={mealNUSLogo} alt="MealNUS Logo" />
            </div>

            <Link href="/">
              <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                <div>
                  <PersonIcon />
                </div>
              </Avatar>
            </Link>

            <Typography component="h1" variant="h5">
              <b>Staff Sign in</b>
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
                sx={{ mt: 3, mb: 1 }}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ width: "400px", height: "50px" }}
              >
                Sign In
              </Button>
              <Grid container spacing={20}>
                <Grid item>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Sign in as Member"}
                  </Link>
                </Grid>
              </Grid>
            </form>
            {error && (
              <Box mt={2}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div >
  );
}

export default StaffLogin;