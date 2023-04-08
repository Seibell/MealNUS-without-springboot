// Admin Dashboard Template Imports
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../Global/AdminTheme";
import Topbar from "../../Admin/Global/Topbar";
import Sidebar from "../../Admin/Global/Sidebar";

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
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
            {'.'}
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
            case "PAID":
                return "orange";
            case "PREPARING":
                return "green";
            case "DELIVERING":
                return "dodgerblue";
            case "COMPLETED":
                return "dimgray";
            default:  //CREATED
                return "lightpink";
        }
    };

    const columns = [
        {
            field: "orderId",
            headerName: "Order ID",
            flex: 1,
        },
        {
            field: "orderDate",
            headerName: "Order Date",
            flex: 1,
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
            cellClassName: "name-column--cell",
            valueGetter: (params) => params.row.user.firstName
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1,
        },
        {
            field: "orderStatus",
            headerName: "Status",
            flex: 1,
            renderCell: (params) => (
                <span style={{ color: getOrderStatusColor(params.value) }}>
                    {params.value}
                </span>
            ),
        },
        {
            field: "updateOrder",
            headerName: "Update Order",
            flex: 1,
            renderCell: (params) => (
                <button onClick={() => navigate('/UpdateOrder/' + params.row.orderId)}>
                    Add A MealBox
                </button>
            ),
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