import { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../AdminTheme";
import Topbar from "../Admin/Global/Topbar";
import Sidebar from "../Admin/Global/Sidebar";

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../AdminTheme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../Admin/Global/Header";
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
// import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";

const Dashboard = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    const colors = tokens(theme.palette.mode);

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
                                <Header title="DASHBOARD" subtitle="Welcome back, Shalinda!" />
                                <Box>
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
                                        Export Data
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        {/* End of Main Code Body */}


                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>

    );
};

export default Dashboard;