import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import LocalOfferTwoToneIcon from '@mui/icons-material/LocalOfferTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import ForumIcon from '@mui/icons-material/Forum';

export const mainListItems = (
    <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* {Redirect to Dashboard (Main Page)} */}
            <Link to="/admindashboard" style={{ textDecoration: 'none' }}>
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" style={{ color: '#0f3da8' }} />
                </ListItemButton>
            </Link>
            {/* {Redirect to Products} */}
            <Link to="/inventoryHome" style={{ textDecoration: 'none' }}>
                <ListItemButton>
                    <ListItemIcon>
                        <Inventory2TwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Products" style={{ color: '#d46e02' }} />
                </ListItemButton>
            </Link>
            {/* {Redirect to Orders} */}
            <Link to="/adminordermanagement" style={{ textDecoration: 'none' }}>
                <ListItemButton>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Orders" style={{ color: '#0f3da8' }} />
                </ListItemButton>
            </Link>
            {/* {Redirect to Promotions} */}
            <Link to="/adminpromotion" style={{ textDecoration: 'none' }}>
                <ListItemButton>
                    <ListItemIcon>
                        <LocalOfferTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Promotions" style={{ color: '#d46e02' }} />
                </ListItemButton>
            </Link>
        </div>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button
                variant="text"
                color="primary"
                startIcon={<LogoutIcon />}
                component={Link}
                to="/stafflogin"
                sx={{ margin: '5px', color: 'white' }}
            >
            </Button>
        </div>
    </React.Fragment>
);

export default function AdminSideBar() {
    return (
        <div>
            <mainListItems />
            <secondaryListItems />
        </div>);
}