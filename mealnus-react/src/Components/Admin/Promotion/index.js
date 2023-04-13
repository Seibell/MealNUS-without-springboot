
//Editing a promotion
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

import { AdminAuthContext } from "../../../Context/AdminAuthContext";
import { useContext } from "react";

import moment from "moment-timezone";
import { Button, Switch } from "@mui/material";
import { Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useCallback } from "react";
import AddCircle from "@mui/icons-material/AddCircle";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


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


const Promotion = () => {
    const { currentStaff } = useContext(AdminAuthContext);
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const colors = tokens(theme.palette.mode);

    const [promotions, setPromotions] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showDisableAlert, setShowDisableAlert] = useState(false);
    const [appliedPromotionName, setAppliedPromotionName] = useState("");
    const [disabledPromotionName, setDisabledPromotionName] = useState("");

    //Only for enabling the promotion. I can also do it for disabling the promotion,
    //but am confused as to how the admin would manually override this automated function
    //For example, if the admin disables a promotion manually, it will be automatically enabled the next day
    //Is this something we need to account for 
    useEffect(() => {
        axios.get(
            "http://localhost:8080/MealNUS-war/rest/promotion/retrieveAllPromotions"
        )
            .then((response) => {
                setPromotions(response.data.promotionEntities);
                console.log(response.data.promotionEntities);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //This used to run every 24 hours
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         applyPromotionsAutomatically();
    //     }, 24 * 60 * 60 * 1000); // Runs ever 24 hours: 24 * 60 * 60 * 1000. This sentence: runs every 60 seconds: 60 * 1000

    //     return () => clearInterval(interval);
    // }, []);

    //Applies or disables the promotions everyday at midnight
    useEffect(() => {
        const now = new Date();
        const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        const timeUntilMidnight = nextMidnight.getTime() - now.getTime();
        const interval = setInterval(() => {
            applyPromotionsAutomatically();
        }, timeUntilMidnight);

        return () => clearInterval(interval);
    }, []);



    const applyPromotionsAutomatically = () => {
        const today = moment();
        console.log("Timer works at " + today);
        const applicablePromotions = promotions.filter((promotion) => {
            const startDate = moment(promotion.startDate, "YYYY-MM-DD");
            const endDate = moment(promotion.endDate, "YYYY-MM-DD");
            return (
                startDate.isSameOrBefore(today) && endDate.isAfter(today)
            );
        });

        applicablePromotions.forEach((promotion) => {
            handleSwitchChange(promotion);
        });
    };

    //Deleting the promotion
    const handleDeletePromotion = (pId) => {
        if (window.confirm(`Do you want to delete this promotion?`)) {
            axios.delete(`http://localhost:8080/MealNUS-war/rest/promotion/delete/${pId}`)
                .then(() => {
                    // Call the API again to fetch the updated data after deleting the promotion
                    axios.get("http://localhost:8080/MealNUS-war/rest/promotion/retrieveAllPromotions")
                        .then((response) => {
                            setPromotions(response.data.promotionEntities);
                            console.log(response.data.promotionEntities);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };


    const handleSwitchChange = (promotion) => {
        const updatedPromotions = promotions.map((p) =>
            p.promotionId === promotion.promotionId
                ? { ...p, isApplied: !p.isApplied }
                : p
        );
        setPromotions(updatedPromotions);

        if (promotion.isApplied) {
            // switch toggled off
            handleToggleBack(promotion);
        } else {
            // switch toggled on
            handleToggle(promotion);
        }
    };

    const handleToggle = (promotion) => {
        if (promotion.categoryName === "Site-Wide") {
            axios.get(`http://localhost:8080/MealNUS-war/rest/promotion/apply/` + promotion.promotionCode)
                .then((response) => {
                    console.log(response.data);
                    setAppliedPromotionName(promotion.promotionName);
                    setShowSuccessAlert(true);
                    setTimeout(() => {
                        setShowSuccessAlert(false);
                    }, 3000);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios.get(`http://localhost:8080/MealNUS-war/rest/promotion/apply/` + promotion.categoryName + '/' + promotion.promotionCode)
                .then((response) => {
                    console.log(response.data);
                    setAppliedPromotionName(promotion.promotionName);
                    setShowSuccessAlert(true);
                    setTimeout(() => {
                        setShowSuccessAlert(false);
                    }, 3000);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleToggleBack = (promotion) => {
        if (promotion.categoryName === "Site-Wide") {
            axios.get(`http://localhost:8080/MealNUS-war/rest/promotion/disable/` + promotion.promotionCode)
                .then((response) => {
                    console.log(response.data);
                    setDisabledPromotionName(promotion.promotionName);
                    setShowDisableAlert(true);
                    setTimeout(() => {
                        setShowDisableAlert(false);
                    }, 3000);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios.get(`http://localhost:8080/MealNUS-war/rest/promotion/disable/` + promotion.categoryName + '/' + promotion.promotionCode)
                .then((response) => {
                    console.log(response.data);
                    setDisabledPromotionName(promotion.promotionName);
                    setShowDisableAlert(true);
                    setTimeout(() => {
                        setShowDisableAlert(false);
                    }, 3000);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };




    const columns = [
        {
            field: "edit",
            headerName: "Edit",
            headerClassName: 'headerName',
            renderCell: (params) => (
                <IconButton>
                    <EditIcon
                        onClick={() => window.open('/updatepromotion/' + params.row.promotionId, 'Update Promotion', 'width=600,height=480')}
                    />
                </IconButton>

            )
        },
        {
            field: "promotionName",
            headerName: "Name",
            cellClassName: "name-column--cell",
            headerClassName: 'headerName',
        },
        {
            field: "promotionCode",
            headerName: "Code",
            headerClassName: 'headerName',
        },
        {
            field: "categoryName",
            headerName: "Category",
            headerClassName: 'headerName',
        },
        {
            field: "discount",
            headerName: "Discount",
            headerClassName: 'headerName',
        },
        {
            field: "startDate",
            headerName: "Start Date",
            headerClassName: 'headerName',
            valueFormatter: (params) => moment(params.value, "YYYY-MM-DD").format("YYYY-MM-DD")
        },
        {
            field: "endDate",
            headerName: "End Date",
            headerClassName: 'headerName',
            valueFormatter: (params) => moment(params.value, "YYYY-MM-DD").format("YYYY-MM-DD")
        },
        {
            field: "isApplied",
            headerName: "Apply",
            headerClassName: 'headerName',
            renderCell: (params) => (
                <Switch
                    checked={params.value}
                    onChange={() => handleSwitchChange(params.row)}
                />
            )
        },
        {
            field: "promotionId",
            headerName: "Action",
            headerClassName: 'headerName',
            renderCell: (params) => (
                <Button
                    onClick={() => handleDeletePromotion(params.value)}
                    variant="contained"
                    color="error"
                >
                    Delete
                </Button>
            )
        }
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
                        <Grid item xs={12}>
                            {showSuccessAlert && (
                                <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
                                    The {appliedPromotionName} promotion was successfully applied!
                                </Alert>
                            )}
                            {showDisableAlert && (
                                <Alert severity="success" onClose={() => setShowDisableAlert(false)}>
                                    The {disabledPromotionName} promotion was successfully disabled!
                                </Alert>
                            )}
                        </Grid>

                        <Box m="20px">
                            <Header title="PROMOTIONS" subtitle="List of Promotions" />

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
                                    onClick={() => window.open('/addpromotion', 'Add Promotion', 'width=600,height=500')}
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

                                        <Typography variant="body1" style={{ whiteSpace: "nowrap", color: colors.white[100] }}>Create New Promotion</Typography>
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
                                    rows={promotions}
                                    columns={columns}
                                    getRowId={(row) => row.promotionId}
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

export default Promotion;



