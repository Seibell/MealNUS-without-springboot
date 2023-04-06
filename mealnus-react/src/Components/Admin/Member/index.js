import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../Global/AdminTheme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../Global/Header";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../Global/AdminTheme";
import Topbar from "../../Admin/Global/Topbar";
import Sidebar from "../../Admin/Global/Sidebar";
import { Avatar } from "@material-ui/core";

import { AdminAuthContext } from "../../../Context/AdminAuthContext";
import { useContext } from "react";

import visaLogo from "../../../Assets/visa-logo.png";
import mastercardLogo from "../../../Assets/mastercard-Logo.png";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="/admindashboard">
                MealNUS
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Member = () => {
    const { currentStaff } = useContext(AdminAuthContext);
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    const colors = tokens(theme.palette.mode);

    const [memberData, setMemberData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/MealNUS-war/rest/User/retrieveAllUsers")
            .then(response => {
                setMemberData(response.data.userEntities);
                console.log(response.data.userEntities);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const columns = [
        {
            field: "userId",
            headerName: "ID",
        },
        {
            field: "firstName",
            headerName: "First Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "lastName",
            headerName: "Last Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "password",
            headerName: "Password",
            flex: 1,
            renderCell: (params) => (
                <span>
                    {params.value ? `${params.value.substring(0, 2)}${"*".repeat(params.value.length - 2)}` : ""}
                </span>
            ),
        },
        {
            field: "creditCards",
            headerName: "Default Credit Card",
            flex: 1,
            valueFormatter: (params) => {
                const firstCard = params.value[0];
                if (firstCard) {
                    const maskedNumber = `•••• •••• •••• ${firstCard.number.slice(-4)}`;
                    const cardType = firstCard.type;
                    const cardLogo = firstCard.cardNumber.startsWith("4") ? visaLogo : mastercardLogo;
                    return (
                        <div>
                            <Avatar src={cardLogo} alt={cardType} />
                            {maskedNumber}
                        </div>
                    );
                } else {
                    return "N.A.";
                }
            },
        },
    ];

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


                        <Box m="20px">
                            <Header title="MEMBERS" subtitle="List of Users" />
                            <Box
                                m="40px 0 0 0"
                                height="50vh"
                                sx={{
                                    "& .MuiDataGrid-root": {
                                        border: "none",
                                    },
                                    "& .MuiDataGrid-cell": {
                                        borderBottom: "none",
                                    },
                                    "& .name-column--cell": {
                                        color: colors.greenAccent[300],
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: colors.blueAccent[700],
                                        borderBottom: "none",
                                    },
                                    "& .MuiDataGrid-virtualScroller": {
                                        backgroundColor: colors.primary[400],
                                    },
                                    "& .MuiDataGrid-footerContainer": {
                                        borderTop: "none",
                                        backgroundColor: colors.blueAccent[700],
                                    },
                                    "& .MuiCheckbox-root": {
                                        color: `${colors.greenAccent[200]} !important`,
                                    },
                                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                        color: `${colors.grey[100]} !important`,
                                    },
                                }}
                            >
                                <DataGrid
                                    checkboxSelection
                                    rows={memberData}
                                    columns={columns}
                                    getRowId={(row) => row.userId}
                                    components={{ Toolbar: GridToolbar }}
                                />
                            </Box>
                        </Box>

                        <Copyright sx={{ pt: 4 }} />
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider >

    );
};

export default Member;