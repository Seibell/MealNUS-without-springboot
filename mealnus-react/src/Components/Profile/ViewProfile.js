import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import NavBar from '../Navigation/NavBar';

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
                    <Avatar 
                        src={currentUser.imageURL}
                        sx={{ m: 1, bgcolor: 'primary.main', width: 200, height: 200 }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {currentUser.firstName} {currentUser.lastName}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography>Email: {currentUser.email}</Typography>
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