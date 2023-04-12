import * as React from 'react';
import { useState, useEffect } from 'react';
import MUILink from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
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


// Mehak's Update Promotion
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdatePromotion(props) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true); // add loading state variable
    const [promotionName, setPromotionName] = useState("");
    const [discount, setDiscount] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [startDate, setStartDate] = useState(moment().toDate());
    const [endDate, setEndDate] = useState(moment().add(1, 'day').toDate());
    const navigate = useNavigate();
    const theme = createTheme();
    const [error, setError] = useState(false);
    const [open, setOpen] = React.useState(true);
    const [selectedCategory, setSelectedCategory] = useState("");
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:8080/MealNUS-war/rest/Category/retrieveAllCategories")
            .then((response) => setCategories(response.data))
            .catch((error) => console.log(error));
    }, []);


    //Issue with pre-loading the data

    useEffect(() => {
        Axios.get(
            "http://localhost:8080/MealNUS-war/rest/promotion/" + id
        )
            .then((response) => {
                const promotion = response.data;
                setPromotionName(promotion.promotionName);
                setDiscount(promotion.discount);
                // setCategoryName(promotion.categoryName);
                // setStartDate(moment(promotion.startDate).toDate());
                // setEndDate(moment(promotion.endDate).toDate());
                setSelectedCategory(promotion.categoryName);
                setLoading(false);
                console.log(promotion);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (discount < 0 || discount > 1) {
            // throw MUI error
            setError(<Alert severity="warning">Discount value should be a decimal value between 0 and 1</Alert>);
            return;
        }

        console.log(id + "is being updated");
        const promotion = {
            promotionName,
            discount,
            categoryName,
            startDate,
            endDate,
            categoryName: selectedCategory
        };

        fetch(`http://localhost:8080/MealNUS-war/rest/promotion/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(promotion)
        }).then((response) => {
            if (response.ok) {
                window.opener.location.reload();
                navigate(window.close());
            } else {
                throw new Error('Something went wrong');
            }
        });
    };


    return (
        <div>
            <section className="content" key="content">
                <div className="card card-primary">
                    <div className="card-header text-center">
                        <h4 className="card-title">Update Promotion</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="inputName">Promotion Name</label>
                                <input
                                    type="text"
                                    id="inputName"
                                    required
                                    className="form-control"
                                    value={promotionName}
                                    onChange={(e) => setPromotionName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="my-dropdown">Select a category:</label>
                                <Autocomplete
                                    id="my-dropdown"
                                    options={categories}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, newValue) => {
                                        setSelectedCategory(newValue ? newValue.name : '');
                                    }}
                                    renderInput={(params) => (
                                        <div ref={params.InputProps.ref} className="input-group">
                                            <input
                                                type="text"
                                                {...params.inputProps}
                                                className="form-control"
                                                placeholder="Type to search"
                                            />
                                            <IconButton
                                                onClick={() => {
                                                    setSelectedCategory('');
                                                    params.inputProps.onChange('');
                                                }}
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </div>
                                    )}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputName">Discount</label>
                                <input
                                    id="inputDiscount"
                                    required
                                    className="form-control"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}

                                />
                                {error}
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputName">Start Date(dd/mm/yyyy)</label>
                                <div className="input-group">
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        selected={startDate}
                                        onChange={(startDate) => {
                                            console.log("#startDate: ", startDate);
                                            setStartDate(startDate);
                                        }}
                                        customInput={<input className="form-control" />}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputName">End Date(dd/mm/yyyy)</label>
                                <div className="input-group">
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        selected={endDate}
                                        onChange={(endDate) => {
                                            console.log("#endDate: ", endDate);
                                            setEndDate(endDate);
                                        }}
                                        customInput={<input className="form-control" />}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <RouterLink to="/adminpromotions" className="btn btn-default" onClick={(e) => window.close()}>
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
    return <UpdatePromotion />;
}
