import React from "react";
import Logo from "../Assets/Logo.svg";
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
import { Link } from "react-router-dom";
import MealNUSLogo from "../Assets/MealNUSLogo-nobg.svg";

import { IconButton, Menu, MenuItem } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { CartContext } from "../Context/CartContext";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);

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

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={MealNUSLogo} alt="" style={logoStyle} />
      </div>
      <div
        className="navbar-links-container"
        style={{ display: "flex", alignItems: "center", paddingRight: "25px" }}
      >
        {/* <a href="/Home">Home</a> */}
        <Link to="/home">Home</Link>
        <Link to="/mealboxes">Order</Link>
        <a href="">Forum</a>
        <Link to="/cart">
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
          <MenuItem onClick={handleClose} component={Link} to="/">
            Logout
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default NavBar;
