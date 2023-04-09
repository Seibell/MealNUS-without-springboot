import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "./AdminTheme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import TakeoutDiningOutlinedIcon from '@mui/icons-material/TakeoutDiningOutlined';
import EggOutlinedIcon from '@mui/icons-material/EggOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';

import ProfShalinda from "../../../Assets/shalinda.jpg";
import mealNUSLogo from '../../../Assets/MealNUS-Logo.png';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.blueAccent[100],
            }}
            onClick={() => setSelected(title)}
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
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

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
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
                height: "1773px"
            }}
        >
            <ProSidebar collapsed={isCollapsed} collapsedWidth={75} width={isCollapsed ? 60 : 280} >
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "0px 0 20px -5px",
                            color: colors.blueAccent[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <div style={{ paddingLeft: '30px' }}>
                                    <img src={mealNUSLogo} alt="MealNUS Logo" style={{ width: '100%', height: 'auto' }} />
                                </div>
                                {/* <Typography variant="h3" color={colors.grey[100]}>
                                    MealNUS Inc.
                                </Typography> */}
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
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
                                    variant="h2"
                                    color={colors.blueAccent[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    Shalinda
                                </Typography>
                                <Typography variant="h5" color={colors.orangeAccent[600]}>
                                    Head, Regional Operations
                                    <br />
                                    MealNUS Asia
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "5%"}>
                        <Item
                            title="Dashboard"
                            to="/admindashboard"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.blueAccent[500]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Members
                        </Typography>
                        <Item
                            title="Manage Members"
                            to="/adminmembers"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.blueAccent[500]}
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
                            color={colors.blueAccent[500]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Inventory
                        </Typography>
                        <Item
                            title="Manage Mealboxes"
                            to="/inventoryHome"
                            icon={<TakeoutDiningOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Manage Ingredients"
                            to="/admindashboard"
                            icon={<LocalPizzaOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Manage Allergens"
                            to="/admindashboard"
                            icon={<EggOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Manage Categories"
                            to="/admindashboard"
                            icon={<CategoryOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.blueAccent[500]}
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

                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
