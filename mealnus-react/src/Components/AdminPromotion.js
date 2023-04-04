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
import Grid from '@mui/material/Grid';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import LocalOfferTwoToneIcon from '@mui/icons-material/LocalOfferTwoTone';
import { AdminAuthContext } from "./AdminAuthContext";
import { useContext } from "react";

// Mehak's Promotion.js
import Axios from "axios";
import moment from "moment";
import DataTable from "react-data-table-component";
import { Button, Switch } from "@mui/material";
import { Alert } from '@mui/material';
import { useCallback } from "react";
import AddCircle from "@mui/icons-material/AddCircle";

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

function AdminPromotions() {
    const { currentStaff } = useContext(AdminAuthContext);

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

    const [promotions, setPromotions] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showDisableAlert, setShowDisableAlert] = useState(false);
    const [appliedPromotionName, setAppliedPromotionName] = useState("");
    const [disabledPromotionName, setDisabledPromotionName] = useState("");
    const [filterText, setFilterText] = useState("");

    useEffect(() => {
        Axios.get(
            "http://localhost:8080/MealNUS-war/rest/promotion/retrieveAllPromotions"
        )
            .then((response) => {
                setPromotions(response.data.promotionEntities);
                console.log(response.data.promotionEntities);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const filteredData = useCallback(() => {
        return promotions.filter((promotion) => {
            const lowerCaseFilterText = filterText.toLowerCase();
            const startDateString = moment(promotion.startDate, "YYYY-MM-DD").format("YYYY-MM-DD");
            const endDateString = moment(promotion.endDate, "YYYY-MM-DD").format("YYYY-MM-DD");
            const discountString = promotion.discount.toString();

            return (
                promotion.promotionName.toLowerCase().includes(lowerCaseFilterText) ||
                promotion.promotionCode.toLowerCase().includes(lowerCaseFilterText) ||
                startDateString.includes(lowerCaseFilterText) ||
                endDateString.includes(lowerCaseFilterText) ||
                discountString.includes(filterText)
            );
        });
    }, [promotions, filterText]);



    const handleDeletePromotion = (pId) => {
        if (window.confirm(`Do you want to delete this promotion?`)) {
            Axios.delete(`http://localhost:8080/MealNUS-war/rest/promotion/delete/${pId}`)
                .then(() => {
                    // Call the API again to fetch the updated data after deleting the promotion
                    Axios.get("http://localhost:8080/MealNUS-war/rest/promotion/retrieveAllPromotions")
                        .then((response) => {
                            setPromotions(response.data.promotionEntities);
                            console.log(response.data.promotionEntities);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };


    const handleSwitchChange = (promotion) => {
        const updatedPromotions = promotions.map((p) =>
            p.promotionId === promotion.promotionId
                ? { ...p, isApplied: !p.isApplied }
                : p
        );
        setPromotions(updatedPromotions);

        if (promotion.isApplied) {
            // switch toggled off
            handleToggleBack(promotion);
        } else {
            // switch toggled on
            handleToggle(promotion);
        }
    };

    const handleToggle = (promotion) => {
        Axios.get(`http://localhost:8080/MealNUS-war/rest/promotion/apply/` + promotion.promotionCode)
            .then((response) => {
                console.log(response.data);
                setAppliedPromotionName(promotion.promotionName);
                setShowSuccessAlert(true);
                setTimeout(() => {
                    setShowSuccessAlert(false);
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const handleToggleBack = (promotion) => {
        Axios.get(`http://localhost:8080/MealNUS-war/rest/promotion/disable/` + promotion.promotionCode)
            .then((response) => {
                console.log(response.data);
                setDisabledPromotionName(promotion.promotionName);
                setShowDisableAlert(true);
                setTimeout(() => {
                    setShowDisableAlert(false);
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const columns = [
        { name: "Name", selector: "promotionName", sortable: true },
        { name: "Code", selector: "promotionCode", sortable: true },
        { name: "Discount", selector: "discount", sortable: true },
        {
            name: "Start Date",
            selector: (row) => row.startDate,
            sortable: true,
            format: (row) => moment(row.startDate, "YYYY-MM-DD").format("YYYY-MM-DD"),
        },
        {
            name: "End Date",
            selector: (row) => row.endDate,
            sortable: true,
            format: (row) => moment(row.endDate, "YYYY-MM-DD").format("YYYY-MM-DD"),
        },
        {
            name: "Apply",
            cell: (row) => (
                <Switch
                    checked={row.isApplied}
                    onChange={() => handleSwitchChange(row)}
                />
            ),
        },
        {
            name: "Action",
            cell: (row) => (
                <Button
                    onClick={() => handleDeletePromotion(row.promotionId)}
                    variant="contained"
                    color="error"
                >
                    Delete
                </Button>
            ),
        },
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
                                        <b>Promotions</b>
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
                                        Add Promotion
                                    </MUILink>
                                </Breadcrumbs>
                            </div>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {showSuccessAlert && (
                                        <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
                                            The {appliedPromotionName} promotion was successfully applied!
                                        </Alert>
                                    )}
                                    {showDisableAlert && (
                                        <Alert severity="success" onClose={() => setShowDisableAlert(false)}>
                                            The {disabledPromotionName} promotion was successfully disabled!
                                        </Alert>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={filterText}
                                            onChange={(e) => setFilterText(e.target.value)}
                                            style={{ height: '30px', marginRight: '5px' }}
                                        />
                                        <RouterLink to="/addpromotion">
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                borderRadius="4px"
                                                bgcolor="grey"
                                                height="100%"
                                                ml={1}
                                                style={{ height: '30px', marginRight: '5px' }}
                                            >
                                                <IconButton>
                                                    <AddCircle style={{ fill: "white" }} />
                                                </IconButton>
                                            </Box>
                                        </RouterLink>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <DataTable
                                        columns={columns}
                                        data={filteredData()}
                                        pagination
                                        highlightOnHover
                                        striped
                                    />
                                </Grid>
                            </Grid>
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