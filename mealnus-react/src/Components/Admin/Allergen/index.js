import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../Global/AdminTheme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AddCircle from "@mui/icons-material/AddCircle";
import Header from "../Global/Header";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../Global/AdminTheme";
import Topbar from "../Global/Topbar";
import Sidebar from "../Global/Sidebar";
import { Avatar } from "@material-ui/core";

import moment from "moment-timezone";

import { AdminAuthContext } from "../../../Context/AdminAuthContext";
import { useContext } from "react";

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

const Allergen = () => {
    const { currentStaff } = useContext(AdminAuthContext);
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    const colors = tokens(theme.palette.mode);

    const [allergen, setallergen] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/MealNUS-war/rest/Allergen/retrieveAllAllergent")
            .then(response => {
                setallergen(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const columns = [
        {
            field: "allergenId",
            headerName: "ID",
            headerClassName: "headerName",
        },
        {
            field: "allergenName",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
            headerClassName: "headerName",
        },
        {
            field: "allergenDescription",
            headerName: "Description",
            flex: 1,
            cellClassName: "name-column--cell",
            headerClassName: "headerName",
        },
        {
            field: "updateAllergen",
            headerName: "Actions",
            flex: 1,
            headerClassName: "headerName",
            renderCell: (params) => (
                <IconButton>
                    <EditIcon onClick={() => window.open('/updateallergen/' + params.row.allergenId, 'Update Allergen', 'width=600,height=400')} />
                </IconButton>
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
                            <Header title="ALLERGENS" subtitle="List of Allergens" />

                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="flex-end"
                                borderRadius="20px"
                                bgcolor="transparent"
                                ml={-3}
                                mr={1}
                                p={1}
                                height="30px"
                                style={{ width: '195px' }}
                            >
                                <Link
                                    style={{ textDecoration: "none" }}
                                    onClick={() => window.open('/addallergen', 'Add Allergen', 'width=600,height=400')}
                                >
                                    <IconButton style={{
                                        borderRadius: "10px",
                                        backgroundColor: colors.mealNUSBlue[100],
                                        color: "#fff",
                                        paddingLeft: "10px",
                                        paddingRight: "10px",
                                        paddingTop: "5px",
                                        paddingBottom: "5px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                        {/* <AddCircle style={{ fill: "black" }} /> */}
                                        <Typography variant="body1" style={{ whiteSpace: "nowrap", color: colors.white[100] }}>Create New Allergen</Typography>

                                    </IconButton>
                                </Link>
                            </Box>

                            <Box
                                m="20px 0 0 0"
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
                                    rows={allergen}
                                    columns={columns}
                                    getRowId={(row) => row.allergenId}
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

export default Allergen;