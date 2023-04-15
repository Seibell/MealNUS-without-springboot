import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import { IconButton, ImageListItem } from '@mui/material';

import { CssBaseline, ThemeProvider } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ColorModeContext, tokens, useMode } from "../Global/AdminTheme";
import Header from "../Global/Header";
import Sidebar from "../Global/Sidebar";
import Topbar from "../Global/Topbar";


import { useContext } from "react";
import { AdminAuthContext } from "../../../Context/AdminAuthContext";

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

const Ingredient = () => {
    const { currentStaff } = useContext(AdminAuthContext);
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    const colors = tokens(theme.palette.mode);

    const [ingred, setIngred] = useState([]);

    const [query, setQuery] = useState("");

    console.log("QUERY: " + query);
    console.log("ingred: ", ingred);

    console.log("HELLO" + ingred[0]);

    useEffect(() => {
        axios.get(
            "http://localhost:8080/MealNUS-war/rest/Ingredient/retrieveAllIngredient"
        )
            .then((response) => {
                setIngred(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const columns = [
        {
            field: 'ingredientId',
            headerName: 'ID',
            headerClassName: 'headerName',
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            cellClassName: 'name-column--cell',
            headerClassName: 'headerName',
        },
        {
            field: 'picture',
            headerName: 'Image',
            flex: 1,
            headerClassName: 'headerName',
            renderCell: (params) => (
                <ImageListItem key={params.row.ingredientId}>
                    <img
                        src={`${params.row.picture}?w=248&fit=crop&auto=format`}
                        srcSet={`${params.row.picture}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={params.row.name}
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
            field: 'updateIngredient',
            headerName: 'Actions',
            flex: 1,
            headerClassName: 'headerName',
            renderCell: (params) => (
                <IconButton
                    onClick={() =>
                        window.open(
                            '/updateingredient/' + params.row.ingredientId,
                            'Update Ingredient',
                            'width=600,height=500'
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
                            <Header title="INGREDIENTS" subtitle="List of Ingredients" />

                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="flex-end"
                                borderRadius="20px"
                                bgcolor="transparent"
                                ml={-1.2}
                                mr={1}
                                p={1}
                                height="30px"
                                style={{ width: '195px' }}
                            >
                                <Link
                                    style={{ textDecoration: "none" }}
                                    onClick={() => window.open('/addingredient', 'Add Ingredient', 'width=600,height=500')}
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

                                        <Typography variant="body1" style={{ whiteSpace: "nowrap", color: colors.white[100] }}>Create New Ingredient</Typography>
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
                                    rows={ingred}
                                    columns={columns}
                                    getRowId={(row) => row.ingredientId}
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

export default Ingredient;