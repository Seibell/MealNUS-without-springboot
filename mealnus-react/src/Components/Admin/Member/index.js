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
import { IconButton, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../Global/AdminTheme";
import Topbar from "../../Admin/Global/Topbar";
import Sidebar from "../../Admin/Global/Sidebar";
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import moment from "moment-timezone";

import { AdminAuthContext } from "../../../Context/AdminAuthContext";
import { useContext } from "react";

import visaLogo from "../../../Assets/visa-logo.png";
import mastercardLogo from "../../../Assets/mastercard-logo.png";
import amexLogo from "../../../Assets/amex-logo.png";
import creditCardLogo from "../../../Assets/creditCard.png";

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

    const getCreditCards = (userId) => {
        axios.get(`http://localhost:8080/MealNUS-war/rest/User/${userId}/cards`)
            .then(response => {
                const updatedMemberData = memberData.map(member => {
                    if (member.userId === userId) {
                        member.creditCards = response.data;
                    }
                    return member;
                });
                setMemberData(updatedMemberData);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        memberData.forEach(member => {
            getCreditCards(member.userId);
        });
    }, [memberData]);

    const getOrders = (userId) => {
        axios.get(`http://localhost:8080/MealNUS-war/rest/orders/retrieveOrdersByUser/${userId}`)
            .then(response => {
                const updatedMemberData = memberData.map(member => {
                    if (member.userId === userId) {
                        member.orderCount = response.data.length;
                    }
                    return member;
                });
                return updatedMemberData;
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        memberData.forEach(member => {
            getOrders(member.userId, setMemberData);
        });
    }, [memberData]);


    const columns = [
        {
            field: "userId",
            headerName: "ID",
            headerClassName: "headerName",
        },
        {
            field: "signupDate",
            headerName: "Sign Up Date",
            headerClassName: "headerName",
            valueFormatter: (params) => {
                const utcTime = moment.utc(params.value, 'YYYY-MM-DD HH:mm:ss');
                const singaporeTime = utcTime.tz('Asia/Singapore');
                return singaporeTime.format('YYYY-MM-DD');
            }
        },
        {
            field: "firstName",
            headerName: "First Name",
            flex: 1,
            cellClassName: "name-column--cell",
            headerClassName: "headerName",
        },
        {
            field: "lastName",
            headerName: "Last Name",
            flex: 1,
            cellClassName: "name-column--cell",
            headerClassName: "headerName",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            headerClassName: "headerName",
        },
        {
            field: "password",
            headerName: "Password",
            flex: 1,
            headerClassName: "headerName",
            renderCell: (params) => (
                <span>
                    {params.value ? `${params.value.substring(0, 2)}${"*".repeat(params.value.length - 2)}` : ""}
                </span>
            ),
        },
        {
            field: "orderCount",
            headerName: "Num of Orders",
            flex: 1,
            headerClassName: "headerName",
            renderCell: (params) => {
                const ordersList = params.value;
                return (
                    <div>
                        {ordersList}
                    </div>
                )
            },
        },
        {
            field: "creditCards",
            headerName: "Primary Credit Card",
            flex: 1,
            headerClassName: "headerName",
            renderCell: (params) => {
                const creditCardsList = params.value;
                const firstCard = creditCardsList.length > 0 ? creditCardsList[0] : null;
                if (firstCard) {
                    const maskedNumber = `•••• •••• •••• ${firstCard.creditCardNumber.slice(-4)}`;
                    const cardLogo = (() => {
                        const firstDigit = firstCard.creditCardNumber.charAt(0);
                        if (firstDigit === '4') {
                            return visaLogo;
                        } else if (['2', '5'].includes(firstDigit)) {
                            return mastercardLogo;
                        } else if (firstDigit === '3') {
                            return amexLogo;
                        } else {
                            return creditCardLogo;
                        }
                    })();
                    // const cardLogo = firstCard.creditCardNumber.startsWith("4") ? visaLogo : mastercardLogo;
                    return (
                        <div>
                            <img src={cardLogo} alt={"Credit Card"} style={{ maxWidth: '24px', maxHeight: '24px', marginRight: '8px', width: 'auto', height: 'auto' }} />
                            {maskedNumber}
                        </div>
                    );
                } else {
                    return "No credit cards added";
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