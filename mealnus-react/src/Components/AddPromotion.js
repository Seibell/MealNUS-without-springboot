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

// Mehak's Add Promotion
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css';


import { mainListItems, secondaryListItems } from './AdminSideBar';
import Avatar from '@mui/material/Avatar';
import mealNUSLogo from '../Assets/MealNUS-Logo.png';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <RouterLink color="inherit" to="/admindashboard">
                MealNUS 
            </RouterLink>{' '}
            {new Date().getFullYear()}
            {'.'}
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

const classes = {
    root: "container",
    form: "form",
    input: "input",
};

function AddPromotion(props) {
    const { id: id = 0 } = props;
    const [promotionName, setPromotionName] = useState("");
    const [discount, setDiscount] = useState("");
    const [startDate, setStartDate] = useState(moment().toDate());
    const [endDate, setEndDate] = useState(moment().add(1, 'day').toDate());
    const navigate = useNavigate();
    const theme = createTheme();
    const [error, setError] = useState('');
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
        return promotionName.trim().length > 0;
    };

    const handleSubmit = (e) => {
        //prevent the normal form submit
        e.preventDefault();

        if (id === 0) {
            //create case
            if (validateData()) {
                const promotionData = {
                    // replace with the relevant data for your use case
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
                        navigate("/adminpromotion");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                const promotionData = {
                    // replace with the relevant data for your use case
                    promotionName,
                    discount,
                    startDate,
                    endDate,
                };
                fetch('http://localhost:8080/MealNUS-war/rest/promotion/update' + id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(promotionData),
                })
                    .then((response) => {
                        navigate("/adminpromotion");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    }

    const headerLabel = id === 0 ? "New Promotion" : "Edit Promotion";

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
                    <div>
                        <img src={mealNUSLogo} alt="MealNUS Logo" />
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
                                        Inventory
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
                                    {/* Add Promotion */}
                                    <MUILink
                                        underline="hover"
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                        color="inherit"
                                        component={RouterLink}
                                        to="/addpromotion"
                                    >
                                        <LocalOfferTwoToneIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                        <b>Add Promotion</b>
                                    </MUILink>
                                </Breadcrumbs>
                            </div>
                        </div>
                        {/* Insert your main body code here */}
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
                                            <label htmlFor="inputName">Discount</label>
                                            <input
                                                id="inputDiscount"
                                                required
                                                className="form-control"
                                                value={discount}
                                                onChange={(e) => setDiscount(e.target.value)}
                                            />
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
                                        <RouterLink to="/adminpromotion">
                                            <button className="btn btn-default" type="button">
                                                Cancel
                                            </button>
                                        </RouterLink>
                                        <button className="btn btn-primary float-right" type="submit" style={{ backgroundColor: "orange", border: "orange" }}>
                                            Submit
                                        </button>

                                    </div>
                                </form>
                            </div>
                        </section>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
export default function AdminPromotions() {
    return <AddPromotion />;
}