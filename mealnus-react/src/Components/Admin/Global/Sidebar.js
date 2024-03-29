import EggOutlinedIcon from '@mui/icons-material/EggOutlined';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import TakeoutDiningOutlinedIcon from '@mui/icons-material/TakeoutDiningOutlined';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { tokens } from "./AdminTheme";

import useMediaQuery from '@mui/material/useMediaQuery';

import mealNUSLogo from '../../../Assets/MealNUS-Logo.png';
import ProfShalinda from "../../../Assets/shalinda.jpg";


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleClick = () => {
        if (selected !== title) {
            setSelected(title);
        }
    };
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.mealNUSBlue[100],
            }}
            onClick={handleClick}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};


const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("");

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 40px 3px 30px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#d47313 !important",
                },
                "& .pro-menu-item.active": {
                    color: `${colors.mealNUSOrange[100]} !important`,
                },
                height: "1612px",
            }}
        >
            <ProSidebar collapsed={isSmallScreen ? true : isCollapsed} collapsedWidth={75} width={isSmallScreen ? 60 : 280} >
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isSmallScreen ? undefined : (isCollapsed ? <MenuOutlinedIcon /> : undefined)}
                        style={{
                            margin: "0px 0 20px -5px",
                            color: colors.mealNUSBlue[100],
                        }}
                    >
                        {!isSmallScreen && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <div style={{ paddingLeft: isCollapsed ? '15px' : '30px' }}>
                                    <img src={mealNUSLogo} alt="MealNUS Logo" style={{ width: '100%', height: 'auto' }} />
                                </div>
                                {!isCollapsed && (
                                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                        <MenuOutlinedIcon />
                                    </IconButton>
                                )}
                            </Box>
                        )}
                    </MenuItem>

                    {!isSmallScreen && (
                        <Box mb="20px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="mealNUS-staff"
                                    width="100px"
                                    height="100px"
                                    src={ProfShalinda}
                                    style={{ borderRadius: "50%" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h3"
                                    color={colors.mealNUSBlue[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 5px 0" }}
                                >
                                    Shalinda Adikari
                                </Typography>
                                <Typography variant="h6" color={colors.mealNUSOrange[100]}>
                                    <b>Vice President of Operations
                                        <br />
                                        MealNUS Inc.</b>
                                </Typography>
                                <Typography variant="h6" color={colors.mealNUSBlue[100]}>
                                    Joined since Jan 2023
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isSmallScreen ? undefined : "5%"}>
                        <Item
                            title="Dashboard"
                            to="/admindashboard"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            color={colors.grey[100]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Members
                        </Typography>
                        <Item
                            title="View Members"
                            to="/adminmembers"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />


                        <Typography
                            variant="h6"
                            color={colors.grey[100]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Orders
                        </Typography>
                        <Item
                            title="Manage Orders"
                            to="/adminorders"
                            icon={<ShoppingBagOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[100]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Inventory
                        </Typography>
                        <Item
                            title="Manage MealBoxes"
                            to="/adminmealboxes"
                            icon={<TakeoutDiningOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Manage Ingredients"
                            to="/adminingredients"
                            icon={<LocalPizzaOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Manage Allergens"
                            to="/adminallergens"
                            icon={<EggOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {/* <Item
                            title="Manage Categories"
                            to="/admindashboard"
                            icon={<CategoryOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        /> */}

                        <Typography
                            variant="h6"
                            color={colors.grey[100]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Promotions
                        </Typography>
                        <Item
                            title="Manage Promotions"
                            to="/adminpromotions"
                            icon={<SellOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* <Typography
                            variant="h6"
                            color={colors.grey[100]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Charts
                        </Typography>
                        <Item
                            title="Manage Charts"
                            to="/admincharts"
                            icon={<InsertChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        /> */}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box >
    );
};

export default Sidebar;
