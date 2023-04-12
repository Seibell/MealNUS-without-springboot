import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

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


import { mainListItems, secondaryListItems } from '../Admin/AdminSideBar';
import Avatar from '@mui/material/Avatar';
import mealNUSLogo from '../../Assets/MealNUS-Logo.png';

// mealBoxSessionBean.createMealBox(new MealBox("Vegetable's Party Box", 001L, new BigDecimal(7), new BigDecimal(12), "This is a vegetable mealBox", 15));

const theme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        MealNUS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function handleClick(event) {
  event.preventDefault();
  const href = event.target.getAttribute('href');
  console.info(`Navigating to ${href}`);
  window.location.href = href;
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

const classes = {
  root: "container",
  form: "form",
  input: "input",
};



function UpdateOrder(props) {

  const { orderId } = useParams();
  const [retrieved, setretrieved] = useState({});

  const [deliveryDate, setdeliveryDates] = useState('');
  const [orderDate, setorderDate] = useState('');
  const [priceList, setpriceList] = useState([]);
  const [costList, setcostList] = useState('');
  const [orderDetails, setorderDetails] = useState({});
  const [user, setuser] = useState({});

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
  const theme = createTheme();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [dateTime, setDateTime] = useState(new Date());

  const handleDeliverydateChange = (event) => {
    setSelectedOptionaddress(event.target.value);
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
  const newOrderDate = moment.utc(formatted).tz('Asia/Singapore').format('DD/MM/YYYY');

  const formatted2 = deliveryDate.replace('Z[UTC]', '');
  const newDeliveryDate = moment.utc(formatted2).tz('Asia/Singapore').format('DD/MM/YYYY');

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
      user
    };
    console.log(orders);

    fetch(`http://localhost:8080/MealNUS-war/rest/orders/update/` + orderId , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orders)
    }).then((response) => {
      if (response.ok) {
        setSuccess(true)
      } else {
        throw new Error('Something went wrong');
      }
    });
  };

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
        setuser(retrieved.user);
        setcostList(retrieved.costList);
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

  if (success) {
    return <Navigate to="/InventoryHome" />;
  }


  const headerLabel = "Update Order";

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
            <IconButton color="inherit">
              <Badge badgeContent={''} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
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
                  <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/admindashboard"
                  >
                    <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Dashboard
                  </Link>
                  {/* Products */}
                  <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/admindashboard"
                  >
                    <Inventory2TwoToneIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Products
                  </Link>
                  {/* Orders */}
                  <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/adminordermanagement"
                  >
                    <ShoppingCartIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Orders
                  </Link>
                  {/* Promotions */}
                  <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/adminpromotion"
                  >
                    <LocalOfferTwoToneIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Promotions
                  </Link>
                  <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/addpromotion"
                  >
                    <LocalOfferTwoToneIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    <b>Add Promotion</b>
                  </Link>
                </Breadcrumbs>
              </div>
            </div>
            {/* Insert your main body code here */}
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
                        className="form-control"
                        value={newDeliveryDate}
                        onChange={handleDeliverydateChange}
                      />
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
                    <Link to="/InventoryHome">
                      <button className="btn btn-default" type="button" onClick={() => navigate('/Orders')}>
                        Cancel
                      </button>
                    </Link>
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
export default function UpdateOrders() {
  return <UpdateOrder />;
}