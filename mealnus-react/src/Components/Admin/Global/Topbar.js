
import { useState, useEffect, useContext } from "react";
import { ColorModeContext, tokens } from "./AdminTheme";
import Typography from '@mui/material/Typography';

import { Box, IconButton, useTheme } from "@mui/material";
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

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="SearchBar coming soon..." />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex" alignItems="center">
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
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <BluetoothOutlinedIcon />
                <SignalWifi3BarOutlinedIcon />
                <FiveGOutlinedIcon />
                <SignalCellular3BarOutlinedIcon />
                
            </Box>
        </Box>
    );
};

export default Topbar;