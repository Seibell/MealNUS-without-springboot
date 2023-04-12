import * as React from 'react';
import { useState, useEffect } from 'react';
import MUILink from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import LocalOfferTwoToneIcon from '@mui/icons-material/LocalOfferTwoTone';
import { AdminAuthContext } from "../../../Context/AdminAuthContext";
import { useContext } from "react";
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@mui/icons-material/Clear';

import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css';

import { CircularProgress } from "@mui/material";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            MealNUS
            {' '}
            {new Date().getFullYear()}
            {' (UEN: 54231804G).'} All rights reserved.
            <p>Computing 1 (COM1), 13 Computing Drive. Singapore 117417</p>
        </Typography>
    );
}

const API_KEY = '995621471943455';
const default_image_url = 'https://i.imgur.com/Kvyecsm.png';


function AddIngredient(props) {
    const { currentStaff } = useContext(AdminAuthContext);
    const [picture, setpicture] = useState(null);
    const [name, setname] = useState('');
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);

    const handleNameChange = (event) => {
        setname(event.target.value);
    };

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
            //setpicture(event.target.files[0]);
            const uploadedImageURL = await uploadImage(file);

            if (uploadedImageURL) {
                setpicture(uploadedImageURL);
            } else {
                setError("Failed to upload image");
            }
        }
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const Ingredient = { name, picture }

        fetch('http://localhost:8080/MealNUS-war/rest/Ingredient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Ingredient)
        })
            .then((response) => {
                window.opener.location.reload();
                navigate(window.close());
            })
            .catch((error) => {
                console.error(error);
            });

        console.log(Ingredient);
    };

    if (!currentStaff) {
        return <div>Access Denied: Please login to access MealNUS Admin Portal...</div>;
    }


    return (
        <div>
            <section className="content" key="content">
                <div className="card card-primary">
                    <div className="card-header text-center">
                        <h4 className="card-title">Add a Ingredient</h4>
                    </div>

                    <form onSubmit={handleFormSubmit}>
                        <div className="card-body">

                            <div className="form-group">
                                <label htmlFor="inputName"> Ingredient Name:</label>
                                <input
                                    type="text"
                                    id="inputName"
                                    required
                                    className="form-control"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </div>


                            <div className="form-group">
                                <label htmlFor="inputName">Upload an image:</label>
                                <input
                                    accept="image/*"
                                    type="file" onChange={handleFileChange}
                                />
                            </div>

                            <div className="form-group">
                                <Box
                                    sx={{
                                        width: 250,
                                        height: 250,
                                    }}>
                                    <img
                                        src={picture}
                                        sx={{
                                            bgcolor: "primary.main",
                                            width: "100px",
                                            height: "100px",
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
                            </div>
                        </div>

                        <div className="card-footer">
                            <RouterLink to="/adminingredients" className="btn btn-default" onClick={(e) => window.close()}>
                                Cancel
                            </RouterLink>
                            <button className="btn btn-primary float-right" type="submit" style={{ backgroundColor: "orange", border: "orange" }}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <Copyright sx={{ pt: 4 }} />
        </div>
    );
}
export default function AdminIngredients() {
    return <AddIngredient />;
}