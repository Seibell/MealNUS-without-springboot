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


import { mainListItems, secondaryListItems } from '.././AdminSideBar';
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



function UpdateMealBox(props) {

  const { mealBoxId } = useParams();
  const [retrieved , setretrieved] = useState({});

  const [itemName, setitemName] = useState('');
  const [itemCode, setitemCode] = useState(''); //Why is this capital? :/ i just copied the one in mealbox... is like this de
  const [itemCost, setitemCost] = useState('');
  const [itemPrice, setitemPrice] = useState('');
  const [itemDescription, setitemDescription] = useState('');
  const [quantityAvailable, setquantityAvailable] = useState('');
  const [success, setSuccess] = useState(false);

  const [query, setQuery] = useState('');
  const [cquery, setcQuery] = useState('');

  const [open, setOpen] = React.useState(true);

  const mdTheme = createTheme();

   //ingredients
   const [availableIngredients, setAvaivableIngredients] = useState([]);
   const [ingredients, setSelectedIngredients] = useState([]);
 
 
  //Category
  const [availableCategory, setavailableCategory] = useState([]);
  const [Category, setCategory] = useState([]);

  const navigate = useNavigate();
  const theme = createTheme();
  const toggleDrawer = () => {
      setOpen(!open);
  };

  const [dateTime, setDateTime] = useState(new Date());

  const handleNameChange = (event) => {
    setitemName(event.target.value);
  };

  const handleCodeChange = (event) => {
    setitemCode(event.target.value);
  };

  const handleCostChange = (event) => {
    setitemCost(event.target.value);
  };

  const handlePriceChange = (event) => {
    setitemPrice(event.target.value);
  };


  const handleDescriptionChange = (event) => {
    setitemDescription(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setquantityAvailable(event.target.value);
  };


  //search filter
  const filteredData = availableIngredients.filter(
    (ingredient) =>
    ingredient.name.toLowerCase().includes(query.toLowerCase())
    //console.log(availableIngredients)
  );

  //search filter
  const filteredcategory = availableCategory.filter(
    (category) =>
    category.name.toLowerCase().includes(cquery.toLowerCase())
    //console.log(availableIngredients)
  );


  const handleInputChange = (event, ingredient) => {
    if (event.target.checked) {
      setSelectedIngredients([
        ...ingredients,
        { ingredientId: ingredient.ingredientId, name: ingredient.name, picture: ingredient.picture },
      ]);
      console.log(ingredients)
    } else {
      setSelectedIngredients(ingredients.filter((item) => item.ingredientId !== ingredient.ingredientId))
    }
  };
  
  const handleCategoryChange = (event, category) => {
    if (event.target.checked) {
      setCategory([
        ...category,
        { categoryId: category.categoryId, name: category.name, picture: category.picture },
      ]);
      console.log(category)
    } else {
      setCategory(category.filter((item) => item.categoryId !== category.categoryId))
    }
  };

  const checkIfIngredientExisit = (ingredients, ingredient) => {
 
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].ingredientId == ingredient.ingredientId) {
        return true;
      }
    }
    return false;
}

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const Mealbox = {
      itemName,
      itemCode,
      itemCost,
      itemPrice,
      itemDescription,
      quantityAvailable,
      ingredients
    }; // i think u need to create some mapping for id == name or make name unique or smth so it can be called by the json

    //console.log(Mealbox)

    fetch(`http://localhost:8080/MealNUS-war/rest/Mealbox/updatemealbox/` + mealBoxId , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Mealbox)
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
      "http://localhost:8080/MealNUS-war/rest/Mealbox/" + mealBoxId
    )
    .then(response => {
      const retrieved = response.data;
      setretrieved(retrieved);
      setitemName(retrieved.itemName);
      setitemCode(retrieved.itemCode);
      setitemCost(retrieved.itemCost);
      setitemPrice(retrieved.itemPrice);
      setitemDescription(retrieved.itemDescription);
      setquantityAvailable(retrieved.quantityAvailable);
      setSelectedIngredients(retrieved.ingredients);
    })
      .catch((err) => {
        console.log(err);
      });
    }, []);



  useEffect(() => {
    Axios.get(
      "http://localhost:8080/MealNUS-war/rest/Ingredient/retrieveAllIngredient"
    )
      .then((response) => {
        setAvaivableIngredients(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Axios.get(
      "http://localhost:8080/MealNUS-war/rest/Category/retrieveAllCategories"
    )
      .then((response) => {
        setavailableCategory(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (success) {
    return <Navigate to="/InventoryHome" />;
  }


  const headerLabel = "New MealBox";

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
                                          <label htmlFor="inputName">MealBox</label>
                                          <input
                                              type="text"
                                              id="inputName"
                                              required
                                              className="form-control"
                                              value={itemName}
                                              onChange={handleNameChange}
                                          />
                                      </div>
                                      <div className="form-group">
                                          <label htmlFor="inputName">Item Code</label>
                                          <input
                                              id="inputCode"
                                              required
                                              className="form-control"
                                              value={itemCode}
                                              onChange={handleCodeChange}
                                          />
                                      </div>
                                      <div className="form-group">
                                          <label htmlFor="inputName">Item Cost</label>
                                          <input
                                              id="inputCost"
                                              required
                                              className="form-control"
                                              value={itemCost}
                                              onChange={handleCostChange}
                                          />
                                      </div>
                                      <div className="form-group">
                                          <label htmlFor="inputName">Item Price</label>
                                          <input
                                              id="inputPrice"
                                              required
                                              className="form-control"
                                              value={itemPrice}
                                              onChange={handlePriceChange}
                                          />
                                      </div>
                                      <div className="form-group">
                                          <label htmlFor="inputName">Item Description</label>
                                          <input
                                              id="inputDescription"
                                              required
                                              className="form-control"
                                              value={itemDescription}
                                              onChange={handleDescriptionChange}
                                          />
                                      </div>
                                      <div className="form-group">
                                          <label htmlFor="inputName">Quantity</label>
                                          <input
                                              id="inputQuantity"
                                              required
                                              className="form-control"
                                              value={quantityAvailable}
                                              onChange={handleQuantityChange}
                                          />
                                      </div>

                                      <div className="form-group">
                                        <label htmlFor="inputName">Ingredients</label>
                                          <div>
                                            <input
                                              type="text"
                                              placeholder="Search"
                                              value={query}
                                              onChange={(event) => setQuery(event.target.value)}
                                            />
                                          <div style={{ maxHeight: '150px', maxWidth:'200px', overflowY: 'scroll' }}>
                                            <table>
                                              <thead>
                                                <tr>
                                                  
                                                </tr>
                                              </thead>
                                              <tbody>
                                              {filteredData.map((ingredient) => (
                                                  <tr  key={ingredient.ingredientId}>
                                                    <td>
                                                    <input
                                                    type="checkbox"
                                                    value={ingredient}
                                                    checked = {checkIfIngredientExisit(ingredients, ingredient)}
                                                    onChange={ (e) => {
                                                      console.log(ingredient);
                                                      console.log(ingredients.includes(ingredient))
                                                      console.log(ingredients);
                                                      if (e.target.checked) {
                                                        setSelectedIngredients([
                                                          ...ingredients,
                                                          { ingredientId: ingredient.ingredientId, name: ingredient.name, picture: ingredient.picture },
                                                        ]);
                                                      } else {
                                                        setSelectedIngredients(ingredients.filter((item) => item.ingredientId !== ingredient.ingredientId))
                                                      }
                                                    } 
                                                        
                                                        }
                                                      />
                                                  {ingredient.name}
                                                    </td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="form-group">
                                          <label htmlFor="inputName">Categories</label>
                                          <div>
                                          <input
                                            type="text"
                                            placeholder="Search"
                                            value={cquery}
                                            onChange={(event) => setcQuery(event.target.value)}
                                          />
                                          <div style={{ maxHeight: '150px', maxWidth:'200px', overflowY: 'scroll' }}>
                                            <table>
                                              <thead>
                                                <tr>
                                                </tr>
                                              </thead>
                                              <tbody>
                                              {filteredcategory.map((category) => (
                                                  <tr  key={category.categoryId}>
                                                    <td>
                                                    <input
                                                    type="checkbox"
                                                    value={category}
                                                    onChange={(event) => handleCategoryChange(event, category)}/>
                                                  {category.name}
                                                    </td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  <div className="card-footer">
                                      <Link to="/InventoryHome">
                                          <button className="btn btn-default" type="button">
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
export default function UpdateMealBoxes() {
  return <UpdateMealBox />;
}