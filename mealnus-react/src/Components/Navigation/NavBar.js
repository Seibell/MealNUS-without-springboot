import React from "react";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import {
  Box,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoudnedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Link, useLocation } from "react-router-dom";
import MealNUSLogo from "../../Assets/MealNUSLogo-nobg.svg";

import { IconButton, Menu, MenuItem } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const logoStyle = {
    width: "175px",
    height: "auto",
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [cart] = useContext(CartContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openMenu, setOpenMenu] = React.useState(false);
  const menuOptions = [
    {
      //Icons are temporary for now
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "User Login",
      icon: <PhoneRoudnedIcon />,
    },
    {
      text: "Staff Login",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
    },
  ];

  const isActive = (path) => {
    return location.pathname === path
      ? {
          color: "#007bff",
          borderColor: "#007bff",
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "4px",
          padding: "2px 4px",
        }
      : {};
  };

  return (
    <ThemeProvider theme={theme}>
      <nav>
        <Link to="/home">
          <div className="nav-logo-container">
            <img src={MealNUSLogo} alt="" style={logoStyle} />
          </div>
        </Link>
        <div
          className="navbar-links-container"
          style={{ display: "flex", alignItems: "center", paddingRight: "25px" }}
        >
          {/* <a href="/Home">Home</a> */}
          <Link to="/home" style={isActive("/home")}>Home</Link>
          <Link to="/mealboxes" style={isActive("/mealboxes")}>Order</Link>
          <Link to="/forum" style={isActive("/forum")}>Forum</Link>
          <Link to="/cart" style={isActive("/cart")}>
            <IconButton>
              <Badge
                badgeContent={cart.reduce((acc, item) => acc + item.quantity, 0)}
                color="error"
              >
                <BsCart2 className="navbar-cart-icon" />
              </Badge>
            </IconButton>
          </Link>
          <IconButton
            color="inherit"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            size="large"
          >
            <Avatar
              src={currentUser.imageURL}
              sx={{ m: 1, bgcolor: "primary.main" }}
            ></Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/viewprofile">
              View Profile
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/editprofile">
              Edit Profile
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/myorders">
              My Orders
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/">
              Logout
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </ThemeProvider>
  );
};

export default NavBar;
