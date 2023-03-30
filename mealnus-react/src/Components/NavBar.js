import React from 'react';
import Logo from '../Assets/Logo.svg';
import { BsCart2 } from 'react-icons/bs';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { Box, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import PhoneRoudnedIcon from '@mui/icons-material/PhoneRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Link } from 'react-router-dom';
import MealNUSLogo from '../Assets/MealNUSLogo-nobg.svg';

import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const NavBar = () => {

    const logoStyle = {
        width: '175px',
        height: 'auto',
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openMenu, setOpenMenu] = React.useState(false);
    const menuOptions = [
        {   //Icons are temporary for now
            text: 'Home',
            icon: <HomeIcon />,
        },
        {
            text: 'About',
            icon: <InfoIcon />,
        },
        {
            text: 'User Login',
            icon: <PhoneRoudnedIcon />,
        },
        {
            text: 'Staff Login',
            icon: <CommentRoundedIcon />,
        },
        {
            text: 'Cart',
            icon: <ShoppingCartRoundedIcon />,
        },
    ];

    return (
        <nav>
            <div className="nav-logo-container">
                <img src={MealNUSLogo} alt="" style={logoStyle} />
            </div>
            <div className="navbar-links-container" style={{alignItems: 'center'}}>
                <a href="">Home</a>
                <a href="">About</a>
                <a href="">Testimonials</a>
                <a href="">Contact</a>
                <a href="">
                    <BsCart2 className="navbar-cart-icon" />
                </a>
                <IconButton
                    color="inherit"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    size="large"
                >
                    <AccountCircle />
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
            <div className="navbar-menu-container">
                <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
            </div>
            <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => setOpenMenu(false)}
                    onKeyDown={() => setOpenMenu(false)}
                >
                    <List>
                        {menuOptions.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        </nav>
    );
};

export default NavBar