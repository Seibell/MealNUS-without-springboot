import React, { useState, useEffect, useContext } from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { AuthContext } from './AuthContext';
import NavBar from './NavBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { Alert } from '@mui/material';

const theme = createTheme();

function EditProfile() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const { currentUser, setCurrentUser } = useContext(AuthContext);

    useEffect(() => {

        if (currentUser) {
            setUser(currentUser);
            setFirstName(currentUser.firstName);
            setLastName(currentUser.lastName);
            setEmail(currentUser.email);
            setPassword(currentUser.password);
        }
    }, [currentUser]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Update user information in the database here
        // Redirect to the view profile page after successful update

        const editedUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            userId: currentUser.userId,
        };

        fetch(`http://localhost:8080/MealNUS-war/rest/User/edit/${currentUser.userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedUser),
        })
            .then((response) => {
                if (response.ok) {
                    setSuccess(true);
                    setCurrentUser(editedUser);
                    setError('');
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    if (success) {
        return <Navigate to="/viewprofile" />;
    }

    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <Box sx={{ mt: 8 }}>
                        <Typography component="h1" variant="h5" align="center">
                            Edit Profile
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="First Name"
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Last Name"
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Email"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 2 }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 4, mb: 2 }}
                            >
                                Save Changes
                            </Button>
                        </form>
                        {error && (
                            <Box mt={2}>
                                <Alert severity="error">{error}</Alert>
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default EditProfile;