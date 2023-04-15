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
import { CircularProgress, TextField } from "@mui/material";

import Axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

function UpdateOrder(props) {
    const { currentStaff } = useContext(AdminAuthContext);

    const { orderId } = useParams();
    const [retrieved, setretrieved] = useState({});

    const [deliveryDate, setdeliveryDates] = useState('');
    const [orderDate, setorderDate] = useState('');
    const [priceList, setpriceList] = useState([]);
    const [costList, setcostList] = useState('');
    const [orderDetails, setorderDetails] = useState({});
    const [user, setuser] = useState({});
    const [userId, setUserId] = useState('');

    const [success, setSuccess] = useState(false);

    const [query, setQuery] = useState('');

    const [open, setOpen] = React.useState(true);

    const mdTheme = createTheme();

    // for the drop down options 
    const [orderStatus, setSelectedOptionorderStatus] = useState('');
    const [orderStatusoptions, setorderStatusOptions] = useState([]);

    const [address, setSelectedOptionaddress] = useState('');
    const [addressoptions, setaddressOptions] = useState([]);

    const navigate = useNavigate();

    const handleDeliverydateChange = (event) => {
        setdeliveryDates(event.target.value);
    };

    const handlePriceChange = (event) => {
        setSelectedOptionaddress(event.target.value);
    };
    const handleorderDate = (event) => {
        setSelectedOptionaddress(event.target.value);
    };
    const handlestatusChange = (event) => {
        setSelectedOptionorderStatus(event.target.value);
    };

    const handleaddressChange = (event) => {
        setSelectedOptionaddress(event.target.value);
    };

    const formatted = orderDate.replace('Z[UTC]', '');
    const newOrderDate = moment.utc(formatted).tz('Asia/Singapore').format('YYYY-MM-DD');

    const formatted2 = deliveryDate.replace('Z[UTC]', '');
    const newDeliveryDate = moment.utc(formatted2).tz('Asia/Singapore').format('YYYY-MM-DD');


    const handleFormSubmit = (event) => {
        event.preventDefault();

        //Date orderDate, List<Pair<MealBox, Integer>> orderDetails, List<BigDecimal> priceList, 
        //Date deliveryDate, AddressEnum address, OrderStatus orderStatus, User user
        const orders = {
            orderDate,
            orderDetails,
            costList,
            priceList,
            deliveryDate,
            address,
            orderStatus,
            userId
        };
        console.log(orders);

        const isFutureDate = (date) => {
            const today = new Date();
            const inputDate = new Date(date);
            return inputDate.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0);
        };


        fetch(`http://localhost:8080/MealNUS-war/rest/orders/updateOrder/` + orderId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orders)
        })
            .then((response) => {
                window.opener.location.reload();
                navigate(window.close());
            })
            .catch((error) => {
                console.error(error);
            });
        console.log(newDeliveryDate);
        console.log(`http://localhost:8080/MealNUS-war/rest/orders/updateOrder/` + orderId);
    }

    //RETRIEVE MEALBOX BY ID
    //console.log("MID" + mealBoxId);
    useEffect(() => {
        Axios.get(
            "http://localhost:8080/MealNUS-war/rest/orders/getOrder/" + orderId
        )
            .then(response => {
                const retrieved = response.data;
                setretrieved(retrieved);
                setSelectedOptionaddress(retrieved.address);
                setdeliveryDates(retrieved.deliveryDate);
                setorderDate(retrieved.orderDate);
                setSelectedOptionorderStatus(retrieved.orderStatus);
                setpriceList(retrieved.priceList);
                setorderDetails(retrieved.orderDetails);
                setUserId(retrieved.userId);
                setcostList(retrieved.costList);

                return Axios.get("http://localhost:8080/MealNUS-war/rest/User/retrieveUser/" + retrieved.userId)
            })
            .then(response => {
                setuser(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    useEffect(() => {
        Axios.get(
            "http://localhost:8080/MealNUS-war/rest/orders/retrieveAllOrderStatus"
        )
            .then((response) => {
                setorderStatusOptions(response.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        Axios.get(
            "http://localhost:8080/MealNUS-war/rest/orders/retrieveAllAddress"
        )
            .then((response) => {
                setaddressOptions(response.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    if (!currentStaff) {
        return <div>Access Denied: Please login to access MealNUS Admin Portal...</div>;
    }

    const headerLabel = "Update Order";


    return (
        <div>
            <section className="content" key="content">
                <div className="card card-primary">
                    <div className="card-header text-center">
                        <h4 className="card-title">{headerLabel}</h4>
                    </div>

                    <form onSubmit={handleFormSubmit}>
                        <div className="card-body">

                            <div className="form-group">
                                <header>User Details</header>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow key={user.userId}>
                                                <TableCell>User</TableCell>
                                                <TableCell>Email</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell >{user.firstName}</TableCell>
                                                <TableCell >{user.email}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>

                            <div className="form-group">
                                <header>User Orders</header>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow key={orderDetails}>
                                                <TableCell>Mealbox Name</TableCell>
                                                <TableCell>Quantity</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Array.isArray(orderDetails) &&
                                                orderDetails.map((details, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell >{details.key.itemName}</TableCell>
                                                        <TableCell >{details.value}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputName">Order Date</label>
                                <input
                                    type="text"
                                    id="inputName"
                                    readOnly
                                    className="form-control"
                                    value={newOrderDate}
                                    onChange={handleorderDate}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputName">Price</label>
                                <input
                                    id="inputCode"
                                    readOnly
                                    className="form-control"
                                    value={priceList}
                                    onChange={handlePriceChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputName">Delivery Date</label>
                                <input
                                    id="inputCost"
                                    required
                                    readOnly
                                    className="form-control"
                                    value={newDeliveryDate}
                                    onChange={handleDeliverydateChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dropdown">Select an option for status:</label>
                                <br />
                                <select id="dropdown" value={orderStatus} onChange={handlestatusChange}>
                                    <option value="">--Please choose an option--</option>
                                    {orderStatusoptions.map(orderStatusoptions => (
                                        <option key={orderStatusoptions} value={orderStatusoptions}>
                                            {orderStatusoptions}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="dropdown">Select an option for Address:</label>
                                <br />
                                <select id="dropdown" value={address} onChange={handleaddressChange}>
                                    <option value="">--Please choose an option--</option>
                                    {addressoptions.map(addressoptions => (
                                        <option key={addressoptions} value={addressoptions}>
                                            {addressoptions}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="card-footer">
                            <RouterLink to="/adminorders" className="btn btn-default" onClick={(e) => window.close()}>
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

export default function AdminOrders() {
    return <UpdateOrder />;
}