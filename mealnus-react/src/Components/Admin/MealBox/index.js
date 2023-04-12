import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Axios from "axios";
import { Box, Typography, useTheme, Switch } from "@mui/material";

import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
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

import moment from "moment-timezone";

import { AdminAuthContext } from "../../../Context/AdminAuthContext";
import { useContext } from "react";

import questionmark from '../../../Assets/default-question-mark-image-url.jpg';

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

const MealBox = () => {
    const { currentStaff } = useContext(AdminAuthContext);
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const colors = tokens(theme.palette.mode);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        Axios.get(
            "http://localhost:8080/MealNUS-war/rest/Mealbox/retrieveAllMealBoxes"
        )
            .then((response) => {
                setOrders(response.data.mealBoxEntities);
                //console.log(response.data.mealBoxEntities);
                //setIsToggled(response.data.mealBoxEntities.statusAvail);
                //console.log(orders.mealBoxEnt)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSwitchChange = (mealbox) => {
        const updated = orders.find((m) => m.mealBoxId === mealbox.mealBoxId);
        console.log(updated.statusAvail);
        updated.statusAvail = !updated.statusAvail;
        console.log(updated);
        console.log(updated[0]);
        fetch('http://localhost:8080/MealNUS-war/rest/Mealbox/setStatusAvailability/' + updated.mealBoxId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updated)
        }).then((response) => {
            if (response.ok) {
            }
        }).catch((error) => {

        });
    };

    const columns = [
        {
            field: 'mealBoxId',
            headerName: 'ID',
            headerClassName: 'headerName',
        },
        {
            field: 'itemName',
            headerName: 'Name',
            flex: 1,
            cellClassName: 'name-column--cell',
            headerClassName: 'headerName',
        },
        {
            field: 'itemImage',
            headerName: 'Image',
            flex: 1,
            headerClassName: 'headerName',
            renderCell: (params) => (
                <ImageListItem key={params.row.mealBoxId}>
                    <img
                        src={`${params.row.itemImage}?w=248&fit=crop&auto=format`}
                        srcSet={`${params.row.itemImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={params.row.itemName}
                        loading="lazy"
                        style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = questionmark;
                        }}
                    />
                </ImageListItem>
            ),
        },
        {
            field: 'itemDescription',
            headerName: 'Description',
            flex: 1,
            cellClassName: 'name-column--cell',
            headerClassName: 'headerName',
        },
        {
            field: 'quantityAvailable',
            headerName: 'Quantity Available',
            flex: 1,
            headerClassName: 'headerName',
        },
        {
            field: 'itemPrice',
            headerName: 'Selling Price',
            flex: 1,
            headerClassName: 'headerName',
        },
        {
            field: 'itemCost',
            headerName: 'Cost Price',
            flex: 1,
            headerClassName: 'headerName',
        },
        {
            field: 'statusAvail',
            headerName: 'Availability',
            flex: 1,
            headerClassName: 'headerName',
            renderCell: (params) => (
                <Switch
                    checked={params.row.statusAvail}
                    onChange={() => handleSwitchChange(params.row)}
                />
            ),
        },
        {
            field: 'updateMealBox',
            headerName: 'Actions',
            flex: 1,
            headerClassName: 'headerName',
            renderCell: (params) => (
                <IconButton
                    onClick={() =>
                        window.open(
                            '/updatemealbox/' + params.row.mealBoxId,
                            'Update Meal Box',
                            'width=600,height=700'
                        )
                    }
                    variant="contained"
                >
                    <EditIcon />
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
                            <Header title="MEALBOXES" subtitle="List of MealBoxes" />
                            <Link
                                style={{ textDecoration: "none" }}
                                onClick={() => window.open('/addmealbox', 'Add MealBox', 'width=600,height=700')}
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    borderRadius="20px"
                                    bgcolor="transparent"
                                    ml={-1.7}
                                    mr={1}
                                    p={1}
                                    height="30px"
                                    style={{ width: '195px' }}
                                >
                                    <IconButton>
                                        <AddCircle style={{ fill: "black" }} />
                                    </IconButton>
                                    <Typography variant="body1" style={{ whiteSpace: "nowrap", color: colors.mealNUSBlue[100] }}>Create New MealBox</Typography>
                                </Box>
                            </Link>
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
                                    rows={orders}
                                    columns={columns}
                                    getRowId={(row) => row.mealBoxId}
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

export default MealBox;