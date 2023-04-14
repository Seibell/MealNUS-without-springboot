// Admin Dashboard Template Imports
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../Global/AdminTheme";
import Topbar from "../../Admin/Global/Topbar";
import Sidebar from "../../Admin/Global/Sidebar";

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../Global/AdminTheme";
import Header from "../../Admin/Global/Header";
import { useNavigate } from 'react-router-dom';
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
// import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";

import { AdminAuthContext } from "../../../Context/AdminAuthContext";
import { useContext } from "react";

import moment from "moment-timezone";
import { Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useCallback } from "react";
import AddCircle from "@mui/icons-material/AddCircle";

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

const Order = () => {
    const { currentStaff } = useContext(AdminAuthContext);
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();

    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/MealNUS-war/rest/orders/retrieveAllOrders")
            .then(response => {
                setOrderData(response.data.orderEntities);
                console.log(response.data.orderEntities);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const getOrderStatusColor = (orderStatus) => {
        switch (orderStatus) {
            case "CREATED":
                return "lightpink";
            case "PAID":
                return "orange";
            case "PREPARING":
                return "green";
            case "DELIVERING":
                return "dodgerblue";
            case "COMPLETED":
                return "dimgray";
            default:  //CANCELLED
                return "tomato";
        }
    };

    const columns = [
        {
            field: "orderId",
            headerName: "Order ID",
            headerClassName: "headerName",
        },
        {
            field: "orderDate",
            headerName: "Order Date",
            flex: 1,
            headerClassName: "headerName",
            valueFormatter: (params) => {
                const utcTime = moment.utc(params.value, 'YYYY-MM-DD HH:mm:ss');
                const singaporeTime = utcTime.tz('Asia/Singapore');
                return singaporeTime.format('YYYY-MM-DD HH:mm:ss');
            }

        },
        {
            field: "firstName",
            headerName: "First Name",
            flex: 1,
            headerClassName: "headerName",
            cellClassName: "name-column--cell",
            valueGetter: (params) => params.row.user.firstName
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1,
            headerClassName: "headerName",
        },
        {
            field: "orderStatus",
            headerName: "Status",
            flex: 1,
            headerClassName: "headerName",
            renderCell: (params) => (
                <Box
                    textAlign="center"
                    backgroundColor={getOrderStatusColor(params.value)}
                    p="5px 10px"
                    borderRadius="15px"
                    width="100px"
                >
                    <b>{params.value}</b>
                </Box>
            ),
        },
        {
            field: "updateOrder",
            headerName: "Actions",
            flex: 1,
            headerClassName: "headerName",
            renderCell: (params) => {
                const isDisabled = params.row.orderStatus === "CANCELLED" || 
                params.row.orderStatus === "COMPLETED";
                return (
                    <IconButton
                        onClick={() =>
                            window.open(
                                '/updateorder/' + params.row.orderId,
                                'Update Order',
                                'width=600,height=500'
                            )
                        }
                        variant="contained"
                        disabled={isDisabled}
                    >
                        <EditIcon />
                    </IconButton>
                );
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
                            <Header title="ORDERS" subtitle="List of Orders" />
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
                                        color: colors.mealNUSBlue[100],
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: colors.mealNUSBlue[100],
                                        borderBottom: "none",
                                    },
                                    "& .MuiDataGrid-virtualScroller": {
                                        backgroundColor: colors.primary[400],
                                    },
                                    "& .MuiDataGrid-footerContainer": {
                                        borderTop: "none",
                                        backgroundColor: colors.mealNUSOrange[100],
                                    },
                                    "& .MuiCheckbox-root": {
                                        color: `${colors.greenAccent[200]} !important`,
                                    },
                                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                        color: `${colors.grey[100]} !important`,
                                    },
                                    "& .headerName": {
                                        color: colors.white[100],
                                    },
                                }}
                            >
                                <DataGrid
                                    checkboxSelection
                                    rows={orderData}
                                    columns={columns}
                                    getRowId={(row) => row.orderId}
                                    components={{ Toolbar: GridToolbar }}
                                />
                            </Box>
                        </Box>

                        <Copyright sx={{ pt: 4 }} />
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>

    );
};

export default Order;