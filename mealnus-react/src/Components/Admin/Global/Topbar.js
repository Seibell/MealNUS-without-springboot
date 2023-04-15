
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ColorModeContext, tokens } from "./AdminTheme";
import Typography from '@mui/material/Typography';

import { Box, IconButton, Menu, MenuItem, useTheme, Avatar } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SignalWifi3BarOutlinedIcon from '@mui/icons-material/SignalWifi3BarOutlined';
import FiveGOutlinedIcon from '@mui/icons-material/FiveGOutlined';
import SignalCellular3BarOutlinedIcon from '@mui/icons-material/SignalCellular3BarOutlined';
import BluetoothOutlinedIcon from '@mui/icons-material/BluetoothOutlined';

import ProfShalinda from "../../../Assets/shalinda.jpg";


const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const [isRotating, setIsRotating] = useState(false);

    const handleToggleColorMode = () => {
        setIsRotating(true);
        theme.palette.mode === 'dark' ? theme.palette.mode = 'light' : theme.palette.mode = 'dark';
        setTimeout(() => setIsRotating(false), 1000);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="SearchBar coming soon..." />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton> */}
            </Box>

            {/* ICONS */}
            <Box display="flex" alignItems="center">
                <Typography color={colors.mealNUSBlue[100]} sx={{ mr: 2 }}>
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
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                {/* <BluetoothOutlinedIcon />
                <SignalWifi3BarOutlinedIcon />
                <FiveGOutlinedIcon />
                <SignalCellular3BarOutlinedIcon /> */}
                <IconButton onClick={handleMenuOpen}>
                    <Avatar
                        src={ProfShalinda}
                        alt="Staff Image"
                        style={{ width: '30px', height: '30px' }}
                    />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => window.open('/', 'Add Promotion', 'width=900,height=800')} component={Link}>View Customer Portal</MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/stafflogin">Logout</MenuItem>
                </Menu>
            </Box>
        </Box >
    );
};

export default Topbar;
