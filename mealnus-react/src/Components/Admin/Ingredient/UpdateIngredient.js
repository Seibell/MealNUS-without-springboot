import * as React from 'react';
import { useState, useEffect } from 'react';
import MUILink from '@mui/material/Link';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AdminAuthContext } from "../../../Context/AdminAuthContext";
import { useContext } from "react";
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@mui/icons-material/Clear';
import { CircularProgress } from "@mui/material";

import Axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css';

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
const theme = createTheme();

function UpdateIngredient(props) {
    const { currentStaff } = useContext(AdminAuthContext);

    const { ingredientId } = useParams();
    const [picture, setpicture] = useState(null);
    const [name, setname] = useState('');
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);

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
            const response = await Axios.post('https://api.cloudinary.com/v1_1/drkpzjlro/image/upload', formData);
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

    const [retrieved, setretrieved] = useState({});
    useEffect(() => {
        Axios.get(
            "http://localhost:8080/MealNUS-war/rest/Ingredient/getIngredientById/" + ingredientId
        )
            .then((response) => {
                const retrieved = response.data;
                setretrieved(retrieved);
                setname(retrieved.name);
                setpicture(retrieved.picture);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [dateTime, setDateTime] = useState(new Date());
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const Ingredient = { name, picture }

        fetch('http://localhost:8080/MealNUS-war/rest/Ingredient/updateIngredient/' + ingredientId,
            {
                method: 'PUT',
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
    }


    if (!currentStaff) {
        return <div>Access Denied: Please login to access MealNUS Admin Portal...</div>;
    }


    return (
        <div>
            <section className="content" key="content">
                <div className="card card-primary">
                    <div className="card-header text-center">
                        <h4 className="card-title">Update Ingredient</h4>
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
                                <label htmlFor="image">Upload Image</label>
                                {picture && (
                                    <div className="form-group">
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            maxWidth: 250,
                                            maxHeight: 250,
                                            width: '100%',
                                            height: '100%',
                                            overflow: 'hidden'
                                        }}>
                                            <img
                                                src={picture}
                                                style={{
                                                    objectFit: "contain",
                                                    backgroundColor: "primary.main",
                                                    maxWidth: "100%",
                                                    maxHeight: "100%",
                                                }}
                                            />
                                        </div>
                                        <hr /> {/* Added divider */}
                                    </div>
                                )}
                                <input
                                    id="image"
                                    className="form-control"
                                    accept="image/*"
                                    type="file" onChange={handleFileChange}
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
    return <UpdateIngredient />;
}