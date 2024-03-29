
// // //------------------------------------------------------------------------------------------------------------------------


// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import MUILink from '@mui/material/Link';
// import { Link as RouterLink } from 'react-router-dom';
// import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiDrawer from '@mui/material/Drawer';
// import Box from '@mui/material/Box';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import Container from '@mui/material/Container';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
// import LocalOfferTwoToneIcon from '@mui/icons-material/LocalOfferTwoTone';
// import { AdminAuthContext } from "../../../Context/AdminAuthContext";
// import { useContext } from "react";
// import Alert from '@mui/material/Alert';


// // Mehak's Add Promotion
// import Axios from "axios";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import moment from "moment";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <RouterLink color="inherit" to="/admindashboard">
//                 MealNUS
//             </RouterLink>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// function handleClick(event) {
//     if (event.target.tagName === 'A') {
//         event.preventDefault();
//         const href = event.target.getAttribute('href');
//         console.info(`Navigating to ${href}`);
//         window.location.href = href;
//     }
// }


// const classes = {
//     root: "container",
//     form: "form",
//     input: "input",
// };

// function AddPromotion(props) {
//     const { currentStaff } = useContext(AdminAuthContext);
//     const { id: id = 0 } = props;
//     const [promotionName, setPromotionName] = useState("");
//     const [discount, setDiscount] = useState("");
//     const [startDate, setStartDate] = useState(moment().toDate());
//     const [endDate, setEndDate] = useState(moment().add(1, 'day').toDate());
//     const navigate = useNavigate();
//     const theme = createTheme();
//     const [error, setError] = useState(false);
//     const [open, setOpen] = React.useState(true);
//     const [selectedCategory, setSelectedCategory] = useState("");
//     const handleCategoryChange = (event) => {
//         setSelectedCategory(event.target.value);
//     };
//     const [categories, setCategories] = useState([]);
//     useEffect(() => {
//         Axios.get("http://localhost:8080/MealNUS-war/rest/Category/retrieveAllCategories")
//             .then((response) => setCategories(response.data))
//             .catch((error) => console.log(error));
//     }, []);
//     const toggleDrawer = () => {
//         setOpen(!open);
//     };

//     const [dateTime, setDateTime] = useState(new Date());

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setDateTime(new Date());
//         }, 1000);
//         return () => clearInterval(intervalId);
//     }, []);

//     useEffect(() => {
//         if (id) {
//             Axios.get(
//                 "http://localhost:8080/MealNUS-war/rest/promotion/" + id
//             )
//                 .then((res) => res.json())
//                 .then((promotion) => {
//                     const { promotionName, discount, startDate, endDate } = promotion;
//                     setPromotionName(promotionName);
//                     setDiscount(discount);
//                     setStartDate(moment(startDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
//                     setEndDate(moment(endDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
//                     console.log("Promotion:", promotion);
//                 });
//         }
//     }, [id]);

//     const validateData = () => {
//         return promotionName.trim().length > 0;
//     };

//     const handleSubmit = (e) => {
//         //prevent the normal form submit
//         e.preventDefault();

//         if (id === 0) {
//             //create case
//             if (validateData()) {
//                 if (discount < 0 || discount > 1) {
//                     // throw MUI error
//                     setError(<Alert severity="warning">Discount value should be a decimal value between 0 and 1</Alert>);
//                     return;
//                 }
//                 const promotionData = {
//                     // replace with the relevant data for your use case
//                     categoryName: selectedCategory,
//                     promotionName,
//                     discount,
//                     startDate,
//                     endDate,
//                 };
//                 fetch('http://localhost:8080/MealNUS-war/rest/promotion', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(promotionData),
//                 })
//                     .then((response) => {
//                         window.opener.location.reload();
//                         navigate(window.close());
//                     })
//                     .catch((error) => {
//                         console.error(error);
//                     });
//             } else {
//                 const promotionData = {
//                     // replace with the relevant data for your use case
//                     promotionName,
//                     discount,
//                     startDate,
//                     endDate,
//                 };
//                 fetch('http://localhost:8080/MealNUS-war/rest/promotion/update' + id, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(promotionData),
//                 })
//                     .then((response) => {
//                         navigate(window.close());
//                     })
//                     .catch((error) => {
//                         console.error(error);
//                     });
//             }
//         }
//     }

//     const headerLabel = id === 0 ? "New Promotion" : "Edit Promotion";

//     if (!currentStaff) {
//         return <div>Access Denied: Please login to access MealNUS Admin Portal...</div>;
//     }


//     return (
//         <div>
//             <section className="content" key="content">
//                 <div className="card card-primary">
//                     <div className="card-header text-center">
//                         <h4 className="card-title">{headerLabel}</h4>
//                     </div>

//                     <form onSubmit={handleSubmit}>
//                         <div className="card-body">
//                             <div className="form-group">
//                                 <label htmlFor="inputName">Promotion Name</label>
//                                 <input
//                                     type="text"
//                                     id="inputName"
//                                     required
//                                     className="form-control"
//                                     value={promotionName}
//                                     onChange={(e) => setPromotionName(e.target.value)}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="my-dropdown">Select a category:</label>
//                                 <select id="my-dropdown" value={selectedCategory} onChange={handleCategoryChange}>
//                                     <option value="">--Select--</option>
//                                     {categories.map((category) => (
//                                         <option key={category.id} value={category.name}>
//                                             {category.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="inputName">Discount</label>
//                                 <input
//                                     id="inputDiscount"
//                                     required
//                                     className="form-control"
//                                     value={discount}
//                                     onChange={(e) => setDiscount(e.target.value)}

//                                 />
//                                 {error}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="inputName">Start Date(dd/mm/yyyy)</label>
//                                 <div className="input-group">
//                                     <DatePicker
//                                         dateFormat="dd/MM/yyyy"
//                                         selected={startDate}
//                                         onChange={(startDate) => {
//                                             console.log("#startDate: ", startDate);
//                                             setStartDate(startDate);
//                                         }}
//                                         customInput={<input className="form-control" />}
//                                     />
//                                 </div>
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="inputName">End Date(dd/mm/yyyy)</label>
//                                 <div className="input-group">
//                                     <DatePicker
//                                         dateFormat="dd/MM/yyyy"
//                                         selected={endDate}
//                                         onChange={(endDate) => {
//                                             console.log("#endDate: ", endDate);
//                                             setEndDate(endDate);
//                                         }}
//                                         customInput={<input className="form-control" />}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="card-footer">
//                             <RouterLink to="/adminpromotions" className="btn btn-default" onClick={(e) => window.close()}>
//                                 Cancel
//                             </RouterLink>
//                             <button className="btn btn-primary float-right" type="submit" style={{ backgroundColor: "orange", border: "orange" }}>
//                                 Submit
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </section>
//             <Copyright sx={{ pt: 4 }} />
//         </div>
//     );
// }
// export default function AdminPromotions() {
//     return <AddPromotion />;
// }



// //------------------------------------------------------------------------------------------------------------------------
//Implementing searching within the categories selection

import ClearIcon from '@mui/icons-material/Clear';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AdminAuthContext } from "../../../Context/AdminAuthContext";


// Mehak's Add Promotion
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

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

function handleClick(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        console.info(`Navigating to ${href}`);
        window.location.href = href;
    }
}


const classes = {
    root: "container",
    form: "form",
    input: "input",
};

function AddPromotion(props) {
    const { currentStaff } = useContext(AdminAuthContext);
    const { id: id = 0 } = props;
    const [promotionName, setPromotionName] = useState("");
    const [discount, setDiscount] = useState("");
    const [startDate, setStartDate] = useState(moment().toDate());
    const [endDate, setEndDate] = useState(moment().add(1, 'day').toDate());
    const navigate = useNavigate();
    const theme = createTheme();
    const [error, setError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
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
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (id) {
            Axios.get(
                "http://localhost:8080/MealNUS-war/rest/promotion/" + id
            )
                .then((res) => res.json())
                .then((promotion) => {
                    const { promotionName, discount, startDate, endDate } = promotion;
                    setPromotionName(promotionName);
                    setDiscount(discount);
                    setStartDate(moment(startDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
                    setEndDate(moment(endDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
                    console.log("Promotion:", promotion);
                });
        }
    }, [id]);

    const validateData = () => {
        return (
          promotionName.trim().length > 0 
        );
      };

    const handleSubmit = (e) => {
        //prevent the normal form submit
        e.preventDefault();

        if (id === 0) {
            //create case
            if (validateData()) {
                if (discount < 0 || discount > 1) {
                    // throw MUI error
                    setError(<Alert severity="warning">Discount value should be a decimal value between 0 and 1</Alert>);
                    return;
                }

                if (startDate.getTime() > endDate.getTime()) {
                    // throw MUI error
                    setDateError(<Alert severity="warning">Promotion start date should be before it's end date</Alert>);
                    return;
                }

                if (selectedCategory.length == 0) {
                    setCategoryError(<Alert severity="warning">Please choose a category</Alert>);
                    return;
                }

                const promotionData = {
                    // replace with the relevant data for your use case
                    categoryName: selectedCategory,
                    promotionName,
                    discount,
                    startDate,
                    endDate,
                };
                fetch('http://localhost:8080/MealNUS-war/rest/promotion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(promotionData),
                })
                    .then((response) => {
                        window.opener.location.reload();
                        navigate(window.close());
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } 
        }
    }

    const headerLabel = "New Promotion";

    if (!currentStaff) {
        return <div>Access Denied: Please login to access MealNUS Admin Portal...</div>;
    }


    return (
        <div>
            <section className="content" key="content">
                <div className="card card-primary">
                    <div className="card-header text-center">
                        <h4 className="card-title">{headerLabel}</h4>
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
                                            {categoryError}
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
                                {dateError}
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
    return <AddPromotion />;
}


