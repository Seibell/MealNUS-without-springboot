import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../Global/AdminTheme";
import Header from "../Global/Header";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../Global/AdminTheme";
import Topbar from "../Global/Topbar";
import Sidebar from "../Global/Sidebar";
import { Avatar } from "@material-ui/core";

import { AdminAuthContext } from "../../../Context/AdminAuthContext";
import { useContext } from "react";

import OrderAddressGeoChart from "../Global/OrderAddressGeoChart";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="/admindashboard">
                MealNUS
            </Link>{' '}
            {new Date().getFullYear()}
            {' (UEN: 54231804G).'} All rights reserved.
            <p>Computing 1 (COM1), 13 Computing Drive. Singapore 117417</p>
        </Typography>
    );
}

const Charts = () => {
    const { currentStaff } = useContext(AdminAuthContext);
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    const colors = tokens(theme.palette.mode);

    if (!currentStaff) {
        return <div>Access Denied: Please login to access MealNUS Admin Portal...</div>;
    }

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />

                        {/* Main Code Body */}
                        <Box m="20px">
                            {/* HEADER */}
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Header title="CHARTS" subtitle="All the visuals you need to succeed!" />
                                {/* <Box>
                                    <Button
                                        sx={{
                                            backgroundColor: colors.blueAccent[700],
                                            color: colors.grey[100],
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            padding: "10px 20px",
                                        }}
                                    >
                                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                                        Export Reports
                                    </Button>
                                </Box> */}
                            </Box>

                            {/* GRID & CHARTS */}
                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(12, 1fr)"
                                // gridAutoRows="140px"
                                gap="20px"
                            >
                                <Box
                                    gridColumn="span 12"
                                    gridRow="span 4"
                                    backgroundColor={colors.primary[400]}
                                    padding="30px"
                                    overflow="auto"
                                    overflow-x="auto"
                                >
                                    <Typography
                                        variant="h5"
                                        fontWeight="600"
                                        sx={{ marginBottom: "5px" }}
                                        color={colors.mealNUSBlue[100]}
                                    >
                                        Geo Chart
                                    </Typography>
                                    <Box height="1000px">
                                        {/* <img src={stayTuned}></img> */}
                                        <OrderAddressGeoChart />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Copyright sx={{ pt: 4 }} />
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider >

    );
};

export default Charts;