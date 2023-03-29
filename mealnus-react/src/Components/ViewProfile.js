import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { AuthContext } from './AuthContext';
import NavBar from './NavBar';

const theme = createTheme();

function ViewProfile() {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <div>Error: User not found.</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <PersonIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {currentUser.firstName} {currentUser.lastName}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography>Email: {currentUser.email}</Typography>
                        <Typography>Password: {currentUser.password}</Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Link to="/editprofile">Edit Profile</Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default ViewProfile;