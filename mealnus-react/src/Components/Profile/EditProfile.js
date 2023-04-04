import React, { useState, useEffect, useContext } from "react";
import { TextField, Button, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { AuthContext } from '../../Context/AuthContext';
import NavBar from '../Navigation/NavBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

const API_KEY = '995621471943455';
const default_image_url = 'https://i.imgur.com/Kvyecsm.png';
const theme = createTheme();

function EditProfile() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [uploading, setUploading] = useState(false);

    const { currentUser, setCurrentUser } = useContext(AuthContext);

    useEffect(() => {

        if (currentUser) {
            setUser(currentUser);
            setFirstName(currentUser.firstName);
            setLastName(currentUser.lastName);
            setEmail(currentUser.email);
            setImageURL(currentUser.imageURL);
            setPassword(currentUser.password);
        }
    }, [currentUser]);

    if (!currentUser) {
        return <div>Error: User not found.</div>;
    }

    const uploadImage = async (file) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'mealnus');
        formData.append('api_key', API_KEY);

        try {
            console.log(formData);
            const response = await axios.post('https://api.cloudinary.com/v1_1/drkpzjlro/image/upload', formData);
            setUploading(false);
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading image:', error.response?.data?.error || error.message);
            setUploading(false);
            return null;
        }
    };

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const uploadedImageURL = await uploadImage(file);

            if (uploadedImageURL) {
                setImageURL(uploadedImageURL);
            } else {
                setError("Failed to upload image");
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Update user information in the database here
        // Redirect to the view profile page after successful update

        const editedUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            imageURL: imageURL,
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
                        <Grid container alignItems="center" justifyContent="center">
                            <label htmlFor="avatar-upload">
                                <input
                                    accept="image/*"
                                    type="file"
                                    id="avatar-upload"
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                />
                                <Box
                                    sx={{
                                        m: 1,
                                        position: "relative",
                                        width: 250,
                                        height: 250,
                                        cursor: "pointer",
                                    }}
                                >
                                    <Avatar
                                        src={imageURL || currentUser.imageURL}
                                        alt={`${currentUser.firstName} ${currentUser.lastName}`}
                                        sx={{
                                            bgcolor: "primary.main",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                    {uploading && (
                                        <CircularProgress
                                            sx={{
                                                position: "absolute",
                                                top: "42%",
                                                left: "43%",
                                            }}
                                        />
                                    )}
                                </Box>
                            </label>
                        </Grid>
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