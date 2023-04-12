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
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import LocalOfferTwoToneIcon from '@mui/icons-material/LocalOfferTwoTone';
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from "../../Context/AdminAuthContext";
import { useContext } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Mehak's Promotion.js
import Axios from "axios";
import moment from "moment";
import DataTable from "react-data-table-component";
import { Button, Switch } from "@mui/material";
import { Alert } from '@mui/material';
import { useCallback } from "react";
import AddCircle from "@mui/icons-material/AddCircle";

import { mainListItems, secondaryListItems } from '../Admin/AdminSideBar';
import Avatar from '@mui/material/Avatar';
import mealNUSLogo from '../../Assets/MealNUS-Logo.png';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="/admindashboard">
                MealNUS
            </Link>{' '}
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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function AdminPromotions(props) {
    const { currentStaff } = useContext(AdminAuthContext);
    const [value, setValue] = React.useState('1');
    const [orders, setOrders] = useState([]);
    const [query, setQuery] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        Axios.get(
            "http://localhost:8080/MealNUS-war/rest/Mealbox/retrieveAllMealBoxes"
        )
            .then((response) => {
                setOrders(response.data.mealBoxEntities);
                //console.log(response.data.mealBoxEntities);
                //setIsToggled(response.data.mealBoxEntities.statusAvail);
                //console.log(orders.mealBoxEnt)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [open, setOpen] = React.useState(true);
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


    const filteredData = useCallback(() => {
        return orders.filter((order) => {
            return (order.itemName.toLowerCase().includes(query.toLowerCase())
            );
        });
    }, [orders, query]);

    // const handleSwitchChange = (mealbox) => {
    //     const updated = orders.map((m) =>
    //         m.mealBoxId === mealbox.mealBoxId
    //             ? { ...m, statusAvail: !m.statusAvail }
    //             : m
    //     );
    //     console.log(updated.mealBoxId + " toggle " + updated.statusAvail);
    //     console.log("updated" + updated);
    //     fetch('http://localhost:8080/MealNUS-war/rest/Mealbox/setStatusAvailability/' +mealbox.mealBoxId , {
    //         method: 'PUT',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(updated)
    //       }).then((response) => {
    //         if (response.ok) {
    //         } 
    //       }).catch((error) => {

    //       });
    //     };

    const handleSwitchChange =  (mealbox) => {
        const updated = orders.find( (m) => m.mealBoxId === mealbox.mealBoxId);
        console.log(updated.statusAvail);
        updated.statusAvail = !updated.statusAvail;
        console.log(updated);
        console.log(updated[0]);
        fetch('http://localhost:8080/MealNUS-war/rest/Mealbox/setStatusAvailability/' + updated.mealBoxId , {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated)
      }).then((response) => {
        if (response.ok) {
        } 
      }).catch((error) => {

      });
    };



    const navigate = useNavigate();

    const columns = [
        { name: "Name of Meal Box", selector: "itemName", sortable: true },
        { name: "Quantity Available", selector: "quantityAvailable", sortable: true },
        { name: "Selling Price", selector: "itemPrice", sortable: true },
        { name: "Cost Price", selector: "itemCost", sortable: true },
        { name: "Status", selector: "itemCost", sortable: true },
        {
            name: "Update Meal Box",
            cell: (row) => (
                <Button
                    onClick={() => navigate('/UpdateMealBox/' + row.mealBoxId)}
                    variant="contained"
                    color="error">
                    Update
                </Button>
            ),
        },
        {
            name: "Set Availability",
            cell: (row) => (
                <Switch
                    checked={row.statusAvail}
                    onChange={() => handleSwitchChange(row)}
                />
            ),
        },
        {
            name: "Update Quantity",
            cell: (row) => (
                <Button
                    onClick={() => navigate('/UpdateQuantity/' + row.mealBoxId)}
                    variant="contained"
                    color="error">
                    Quantity
                </Button>
            ),
        }
    ];

    if (!currentStaff) {
        return <div>Error: Staff not found.</div>;
    }


    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '30px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            MealNUS Admin Dashboard
                        </Typography>
                        <Typography color="inherit" sx={{ mr: 2 }}>
                            {dateTime.toLocaleString('en-SG', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                                hour12: true,
                            })}
                        </Typography>
                        {/* <IconButton color="inherit">
                            <Badge badgeContent={''} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton> */}
                        <Avatar sx={{ m: 1, bgcolor: 'white' }}>
                            <img src={mealNUSLogo} alt="MealNUS Logo" />
                        </Avatar>
                        <List component="nav" sx={{ m: -2 }}>
                            {secondaryListItems}
                        </List>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <div style={{ paddingLeft: '20px' }}>
                        <img src={mealNUSLogo} alt="MealNUS Logo" style={{ width: '80%', height: 'auto' }} />
                    </div>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <div className='container'>
                            <div role="presentation" onClick={handleClick}>
                                <Breadcrumbs
                                    separator={<NavigateNextIcon fontSize="small" />}
                                    aria-label="breadcrumb">
                                    {/* Dashboard */}
                                    <MUILink
                                        underline="hover"
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                        color="inherit"
                                        component={RouterLink}
                                        to="/admindashboard"
                                    >
                                        <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                        Dashboard
                                    </MUILink>
                                    {/* Inventory */}
                                    <MUILink
                                        underline="hover"
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                        color="inherit"
                                        component={RouterLink}
                                        to="/admindashboard"
                                    >
                                        <Inventory2TwoToneIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                        <b>Inventory</b>
                                    </MUILink>
                                    {/* Orders */}
                                    <MUILink
                                        underline="hover"
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                        color="inherit"
                                        component={RouterLink}
                                        to="/adminordermanagement"
                                    >
                                        <ShoppingCartIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                        Orders
                                    </MUILink>
                                    {/* Promotions */}
                                    <MUILink
                                        underline="hover"
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                        color="inherit"
                                        component={RouterLink}
                                        to="/adminpromotion"
                                    >
                                        <LocalOfferTwoToneIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                        Promotions
                                    </MUILink>
                                </Breadcrumbs>
                            </div>


                            <button onClick={() => navigate('/AddMealBox/')}
                            >Add A MealBox
                            </button>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>

                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    style={{ height: '30px', marginRight: '5px' }}
                                />
                            </div>
                            {
                                <DataTable
                                    columns={columns}
                                    data={filteredData()}
                                    pagination
                                    highlightOnHover
                                    striped
                                />}
                        </div>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function AdminPromotion() {
    return <AdminPromotions />;
}