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

function AddAllergen(props) {
    const { currentStaff } = useContext(AdminAuthContext);
    const navigate = useNavigate();
    const theme = createTheme();
    const [error, setError] = useState(false);
    const [open, setOpen] = React.useState(true);

    const [dateTime, setDateTime] = useState(new Date());

    const [allergenDescription, setallergenDescription] = useState('');
    const [allergenName, setallergenName] = useState('');

    const handleNameChange = (event) => {
        setallergenName(event.target.value);
    };

    const handleDescChange = (event) => {
        setallergenDescription(event.target.value);
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const Allergen = { allergenName, allergenDescription }

        fetch('http://localhost:8080/MealNUS-war/rest/Allergen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Allergen),
        })
            .then((response) => {
                window.opener.location.reload();
                navigate(window.close());
            })
            .catch((error) => {
                console.error(error);
            });

        console.log(Allergen);
        // Handle the response as necessary (e.g., update the UI)
    };

    if (!currentStaff) {
        return <div>Access Denied: Please login to access MealNUS Admin Portal...</div>;
    }


    return (
        <div>
            <section className="content" key="content">
                <div className="card card-primary">
                    <div className="card-header text-center">
                        <h4 className="card-title">Add Allergen</h4>
                    </div>

                    <form onSubmit={handleFormSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="inputName">Allergen Name:</label>
                                <input
                                    type="text"
                                    id="inputName"
                                    required
                                    className="form-control"
                                    value={allergenName} onChange={handleNameChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputName"> Allergen Description:</label>
                                <input
                                    type="text"
                                    id="inputName"
                                    required
                                    className="form-control"
                                    value={allergenDescription} onChange={handleDescChange}
                                />
                            </div>

                        </div>
                        <div className="card-footer">
                            <RouterLink to="/adminallergens" className="btn btn-default" onClick={(e) => window.close()}>
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
export default function AdminPromotions() {
    return <AddAllergen />;
}