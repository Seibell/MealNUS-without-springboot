// Admin Dashboard Template Imports
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Global/AdminTheme";
import Topbar from "../Admin/Global/Topbar";
import Sidebar from "../Admin/Global/Sidebar";

import moment from 'moment-timezone';

import { Box,Typography, useTheme } from "@mui/material";
import { tokens } from "./Global/AdminTheme";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TollIcon from '@mui/icons-material/Toll';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import Header from "../Admin/Global/Header";
import DailyOrderLineChart from "./Global/MonthlyOrderLineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
import StatBox from "../Admin/Global/StatBox";
import TopSellingMealboxes from "./Global/TopSellingMealboxes";

import { AdminAuthContext } from "../../Context/AdminAuthContext";
import { useContext } from "react";

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

const Dashboard = () => {
    const { currentStaff } = useContext(AdminAuthContext);
    
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const colors = tokens(theme.palette.mode);

    const [todayCountData, setTodayCountData] = useState(0);
    const [yesterdayCountData, setYesterdayCountData] = useState(0);
    const [todayRevenueData, setTodayRevenueData] = useState(0);
    const [yesterdayRevenueData, setYesterdayRevenueData] = useState(0);
    const [mtdCount, setMtdCount] = useState(0);
    const [prevMtdCount, setPrevMtdCount] = useState(0);
    const [mtdRevenue, setMtdRevenue] = useState(0);
    const [prevMtdRevenue, setPrevMtdRevenue] = useState(0);
    const [mtdProfit, setMtdProfit] = useState(0);
    const [prevMtdProfit, setPrevMtdProfit] = useState(0);
    const [mtdCost, setMtdCost] = useState(0);
    const [prevMtdCost, setPrevMtdCost] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [orderData, setOrderData] = useState([]);
    const [todayNewUserCount, setTodayNewUserCount] = useState(0);
    const [yesterdayNewUserCount, setYesterdayNewUserCount] = useState(0);


    useEffect(() => {
        const currentDate = new Date().toISOString().slice(0, 10);
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/currentDateOrderCount/${currentDate}`)
            .then(response => response.json())
            .then(todayCountData => setTodayCountData(todayCountData))
    }, []);

    const todayOrderCount = todayCountData;

    useEffect(() => {
        const currentDate = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/currentDateOrderCount/${currentDate}`)
            .then(response => response.json())
            .then(yesterdayCountData => setYesterdayCountData(yesterdayCountData))
    }, []);

    const yesterdayOrderCount = yesterdayCountData;

    let todayOrderCountProgress;
    if (yesterdayOrderCount <= 0) {
        todayOrderCountProgress = '+100%';
    } else if (todayOrderCount > yesterdayOrderCount) {
        const orderCountDiff = todayOrderCount - yesterdayOrderCount;
        todayOrderCountProgress = `+${Math.round(orderCountDiff / yesterdayOrderCount * 100)}%`;
    } else if (todayOrderCount === yesterdayOrderCount) {
        const orderCountDiff = yesterdayOrderCount - todayOrderCount;
        todayOrderCountProgress = `${Math.round(orderCountDiff / yesterdayOrderCount * 100)}%`;
    } else {
        const orderCountDiff = yesterdayOrderCount - todayOrderCount;
        todayOrderCountProgress = `-${Math.round(orderCountDiff / yesterdayOrderCount * 100)}%`;
    }

    useEffect(() => {
        const currentDate = new Date().toISOString().slice(0, 10);
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/currentDateRevenue/${currentDate}`)
            .then(response => response.json())
            .then(todayRevenueData => setTodayRevenueData(todayRevenueData));
    }, []);

    const todayOrderRevenue = todayRevenueData;

    useEffect(() => {
        const currentDate = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/currentDateRevenue/${currentDate}`)
            .then(response => response.json())
            .then(yesterdayRevenueData => setYesterdayRevenueData(yesterdayRevenueData));
    }, []);

    const yesterdayOrderRevenue = yesterdayRevenueData;

    let todayOrderRevenueProgress;
    if (yesterdayOrderRevenue <= 0) {
        todayOrderRevenueProgress = '+100%';
    } else if (todayOrderRevenue > yesterdayOrderRevenue) {
        const orderRevenueDiff = todayOrderRevenue - yesterdayOrderRevenue;
        todayOrderRevenueProgress = `+${Math.round(orderRevenueDiff / yesterdayOrderRevenue * 100)}%`;
    } else if (todayOrderRevenue === yesterdayOrderRevenue) {
        const orderRevenueDiff = todayOrderRevenue - yesterdayOrderRevenue;
        todayOrderRevenueProgress = `${Math.round(orderRevenueDiff / yesterdayOrderRevenue * 100)}%`;
    } else {
        const orderRevenueDiff = yesterdayOrderRevenue - todayOrderRevenue;
        todayOrderRevenueProgress = `-${Math.round(orderRevenueDiff / yesterdayOrderRevenue * 100)}%`;
    }

    useEffect(() => {
        const currentDate = moment.utc(new Date(), 'YYYY-MM-DD HH:mm:ss').tz('Asia/Singapore').format('YYYY-MM-DD');
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/mtdOrderCount/${currentDate}`)
            .then(response => response.json())
            .then(mtdCount => setMtdCount(mtdCount));
    }, []);

    const mtdOrderCount = mtdCount;

    useEffect(() => {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const formattedDate = moment.utc(oneMonthAgo, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Singapore').format('YYYY-MM-DD');
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/mtdOrderCount/${formattedDate}`)
            .then(response => response.json())
            .then(prevMtdCount => setPrevMtdCount(prevMtdCount));
    }, []);

    const prevMtdOrderCount = prevMtdCount;

    let todayMtdCountProgress;
    if (prevMtdOrderCount <= 0) {
        todayMtdCountProgress = '+100%';
    } else if (mtdOrderCount > prevMtdOrderCount) {
        const mtdOrderCountDiff = mtdOrderCount - prevMtdOrderCount;
        todayMtdCountProgress = `+${Math.round(mtdOrderCountDiff / prevMtdOrderCount * 100)}%`;
    } else if (mtdOrderCount === prevMtdOrderCount) {
        const mtdOrderCountDiff = mtdOrderCount - prevMtdOrderCount;
        todayMtdCountProgress = `${Math.round(mtdOrderCountDiff / prevMtdOrderCount * 100)}%`;
    } else {
        const mtdOrderCountDiff = prevMtdOrderCount - mtdOrderCount;
        todayMtdCountProgress = `-${Math.round(mtdOrderCountDiff / prevMtdOrderCount * 100)}%`;
    }

    useEffect(() => {
        const currentDate = moment.utc(new Date(), 'YYYY-MM-DD HH:mm:ss').tz('Asia/Singapore').format('YYYY-MM-DD');
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/mtdRevenue/${currentDate}`)
            .then(response => response.json())
            .then(mtdRevenue => setMtdRevenue(mtdRevenue));
    }, []);

    const mtdOrderRevenue = mtdRevenue;

    useEffect(() => {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const formattedDate = moment.utc(oneMonthAgo, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Singapore').format('YYYY-MM-DD');
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/mtdRevenue/${formattedDate}`)
            .then(response => response.json())
            .then(prevMtdRevenue => setPrevMtdRevenue(prevMtdRevenue));
    }, []);

    const prevMtdOrderRevenue = prevMtdRevenue;

    let todayMtdRevenueProgress;
    if (prevMtdOrderRevenue <= 0) {
        todayMtdRevenueProgress = '+100%';
    } else if (mtdOrderRevenue > prevMtdOrderRevenue) {
        const mtdOrderRevenueDiff = mtdOrderRevenue - prevMtdOrderRevenue;
        todayMtdRevenueProgress = `+${Math.round(mtdOrderRevenueDiff / prevMtdOrderRevenue * 100)}%`;
    } else if (mtdOrderRevenue === prevMtdOrderRevenue) {
        const mtdOrderRevenueDiff = mtdOrderRevenue - prevMtdOrderRevenue;
        todayMtdRevenueProgress = `${Math.round(mtdOrderRevenueDiff / prevMtdOrderRevenue * 100)}%`;
    } else {
        const mtdOrderRevenueDiff = prevMtdOrderRevenue - mtdOrderRevenue;
        todayMtdRevenueProgress = `-${Math.round(mtdOrderRevenueDiff / prevMtdOrderRevenue * 100)}%`;
    }

    useEffect(() => {
        const currentDate = moment.utc(new Date(), 'YYYY-MM-DD HH:mm:ss').tz('Asia/Singapore').format('YYYY-MM-DD');
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/mtdProfit/${currentDate}`)
            .then(response => response.json())
            .then(mtdProfit => setMtdProfit(mtdProfit));
    }, []);

    const mtdOrderProfit = mtdProfit;

    useEffect(() => {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const formattedDate = moment.utc(oneMonthAgo, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Singapore').format('YYYY-MM-DD');
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/mtdProfit/${formattedDate}`)
            .then(response => response.json())
            .then(prevMtdProfit => setPrevMtdProfit(prevMtdProfit));
    }, []);

    const prevMtdOrderProfit = prevMtdProfit;

    let todayMtdProfitProgress;
    if (prevMtdOrderProfit <= 0) {
        todayMtdProfitProgress = '+100%';
    } else if (mtdOrderProfit > prevMtdOrderProfit) {
        const mtdOrderProfitDiff = mtdOrderProfit - prevMtdOrderProfit;
        todayMtdProfitProgress = `+${Math.round(mtdOrderProfitDiff / prevMtdOrderProfit * 100)}%`;
    } else if (mtdOrderProfit === prevMtdOrderProfit) {
        const mtdOrderProfitDiff = mtdOrderProfit - prevMtdOrderProfit;
        todayMtdProfitProgress = `${Math.round(mtdOrderProfitDiff / prevMtdOrderProfit * 100)}%`;
    } else {
        const mtdOrderProfitDiff = prevMtdOrderProfit - mtdOrderProfit;
        todayMtdProfitProgress = `-${Math.round(mtdOrderProfitDiff / prevMtdOrderProfit * 100)}%`;
    }

    useEffect(() => {
        const currentDate = moment.utc(new Date(), 'YYYY-MM-DD HH:mm:ss').tz('Asia/Singapore').format('YYYY-MM-DD');
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/mtdCost/${currentDate}`)
            .then(response => response.json())
            .then(mtdCost => setMtdCost(mtdCost));
    }, []);

    const mtdOrderCost = mtdCost;

    useEffect(() => {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const formattedDate = moment.utc(oneMonthAgo, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Singapore').format('YYYY-MM-DD');
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/mtdCost/${formattedDate}`)
            .then(response => response.json())
            .then(prevMtdCost => setPrevMtdCost(prevMtdCost));
    }, []);

    const prevMtdOrderCost = prevMtdCost;

    let todayMtdCostProgress;
    if (prevMtdOrderCost <= 0) {
        todayMtdCostProgress = '+100%';
    } else if (mtdOrderCost > prevMtdOrderCost) {
        const mtdOrderCostDiff = mtdOrderCost - prevMtdOrderCost;
        todayMtdCostProgress = `+${Math.round(mtdOrderCostDiff / prevMtdOrderCost * 100)}%`;
    } else if (mtdOrderCost === prevMtdOrderCost) {
        const mtdOrderCostDiff = mtdOrderCost - prevMtdOrderCost;
        todayMtdCostProgress = `${Math.round(mtdOrderCostDiff / prevMtdOrderCost * 100)}%`;
    } else {
        const mtdOrderCostDiff = prevMtdOrderCost - mtdOrderCost;
        todayMtdCostProgress = `-${Math.round(mtdOrderCostDiff / prevMtdOrderCost * 100)}%`;
    }

    useEffect(() => {
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/totalRevenue`)
            .then(response => response.json())
            .then(totalRevenue => setTotalRevenue(totalRevenue));
    }, []);

    const totalRev = totalRevenue;

    useEffect(() => {
        fetch('http://localhost:8080/MealNUS-war/rest/orders/retrieveAllOrders')
            .then(response => response.json())
            .then(data => setOrderData(data.orderEntities))
            .catch(error => console.error(error));
    }, []);


    useEffect(() => {
        const currentDate = moment.utc(new Date(), 'YYYY-MM-DD HH:mm:ss').tz('Asia/Singapore').format('YYYY-MM-DD');
        // const currentDate = new Date().toISOString().slice(0, 10);
        fetch(`http://localhost:8080/MealNUS-war/rest/User/numOfNewUsersBySignupDate/${currentDate}`)
            .then(response => response.json())
            .then(todayNewUserCount => setTodayNewUserCount(todayNewUserCount))
    }, []);

    const todayNewMemberCount = todayNewUserCount;

    useEffect(() => {
        const currentDate = moment.utc(new Date(Date.now() - 86400000), 'YYYY-MM-DD HH:mm:ss').tz('Asia/Singapore').format('YYYY-MM-DD');
        // const currentDate = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        fetch(`http://localhost:8080/MealNUS-war/rest/User/numOfNewUsersBySignupDate/${currentDate}`)
            .then(response => response.json())
            .then(yesterdayNewUserCount => setYesterdayNewUserCount(yesterdayNewUserCount))
    }, []);

    const yesterdayNewMemberCount = yesterdayNewUserCount;

    let todayUserCountProgress;
    if (yesterdayNewMemberCount <= 0) {
        todayUserCountProgress = '+100%';
    } else if (todayNewMemberCount > yesterdayNewMemberCount) {
        const userCountDiff = todayNewMemberCount - yesterdayNewMemberCount;
        todayUserCountProgress = `+${Math.round(userCountDiff / yesterdayNewMemberCount * 100)}%`;
    } else if (todayNewMemberCount === yesterdayNewMemberCount) {
        const userCountDiff = yesterdayNewMemberCount - todayNewMemberCount;
        todayUserCountProgress = `${Math.round(userCountDiff / yesterdayNewMemberCount * 100)}%`;
    } else {
        const userCountDiff = yesterdayNewMemberCount - todayNewMemberCount;
        todayUserCountProgress = `-${Math.round(userCountDiff / yesterdayNewMemberCount * 100)}%`;
    }



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

                        {/* Main Code Body */}
                        <Box m="20px">
                            {/* HEADER */}
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Header title="DASHBOARD" subtitle="Welcome back, Shalinda!" />
                                {/* <Box>
                                    <Button
                                        sx={{
                                            backgroundColor: colors.blueAccent[700],
                                            color: colors.grey[100],
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            padding: "10px 20px",
                                        }}
                                    >
                                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                                        Export Reports
                                    </Button>
                                </Box> */}
                            </Box>

                            {/* GRID & CHARTS */}
                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(12, 1fr)"
                                gridAutoRows="140px"
                                gap="20px"
                            >

                                {/* ROW 1 */}
                                <Box
                                    gridColumn="span 6"
                                    backgroundColor={colors.primary[400]}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <StatBox
                                        title={todayOrderCount.toLocaleString('en-US')}
                                        subtitle="Today's Orders"
                                        progress={todayOrderCount > 0 ? (todayOrderCount / 5) : 0}
                                        increase={todayOrderCountProgress}
                                        icon={
                                            <LocalMallIcon
                                                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
                                            />
                                        }
                                    />
                                </Box>
                                <Box
                                    gridColumn="span 6"
                                    backgroundColor={colors.primary[400]}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <StatBox
                                        title={<Typography variant="h4" fontWeight="bold">$ {todayOrderRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</Typography>}
                                        subtitle="Today's Revenue"
                                        progress={todayOrderRevenue > 0 ? (todayOrderRevenue / 500) : 0}
                                        increase={todayOrderRevenueProgress}
                                        icon={
                                            <PointOfSaleIcon
                                                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
                                            />
                                        }
                                    />
                                </Box>


                                {/* ROW 2 */}
                                <Box
                                    gridColumn="span 3"
                                    backgroundColor={colors.primary[400]}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <StatBox
                                        title={mtdOrderCount.toLocaleString('en-US')}
                                        subtitle="MTD Orders"
                                        progress={mtdOrderCount > 0 ? (mtdOrderCount / 200) : 0}
                                        increase={todayMtdCountProgress}
                                        icon={
                                            <LocalMallIcon
                                                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
                                            />
                                        }
                                    />
                                </Box>
                                <Box
                                    gridColumn="span 3"
                                    backgroundColor={colors.primary[400]}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <StatBox
                                        title={<Typography variant="h4" fontWeight="bold">$ {mtdOrderRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</Typography>}
                                        subtitle="MTD Revenue"
                                        progress={mtdOrderRevenue > 0 ? (mtdOrderRevenue / 15000) : 0}
                                        increase={todayMtdRevenueProgress}
                                        icon={
                                            <PointOfSaleIcon
                                                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
                                            />
                                        }
                                    />
                                </Box>
                                <Box
                                    gridColumn="span 3"
                                    backgroundColor={colors.primary[400]}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <StatBox
                                        title={<Typography variant="h4" fontWeight="bold">$ {mtdOrderProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}</Typography>}
                                        subtitle="MTD Profit"
                                        progress={mtdOrderProfit > 0 ? (mtdOrderProfit / 5000) : 0}
                                        increase={todayMtdProfitProgress}
                                        icon={
                                            <MonetizationOnIcon
                                                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
                                            />
                                        }
                                    />
                                </Box>
                                <Box
                                    gridColumn="span 3"
                                    backgroundColor={colors.primary[400]}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <StatBox
                                        title={<Typography variant="h4" fontWeight="bold">$ {mtdOrderCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}</Typography>}
                                        subtitle="MTD Cost"
                                        progress={mtdOrderCost > 0 ? (mtdOrderCost / 10000) : 0}
                                        increase={todayMtdCostProgress}
                                        icon={
                                            <TollIcon
                                                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
                                            />
                                        }
                                    />
                                </Box>

                                {/* ROW 3 */}
                                <Box
                                    gridColumn="span 12"
                                    backgroundColor={colors.primary[400]}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <StatBox
                                        title={<Typography variant="h4" fontWeight="bold">{todayNewMemberCount.toLocaleString('en-US')}</Typography>}
                                        subtitle="New Signups"
                                        progress={todayNewMemberCount > 0 ? (todayNewMemberCount / 10) : 0}
                                        increase={todayUserCountProgress}
                                        icon={
                                            <PersonAddAlt1Icon
                                                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
                                            />
                                        }
                                    />
                                </Box>

                                {/* ROW 4 */}
                                <Box
                                    gridColumn="span 8"
                                    gridRow="span 2"
                                    backgroundColor={colors.primary[400]}
                                >
                                    <Box
                                        mt="20px"
                                        p="0 30px"
                                        display="flex "
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Box>
                                            <Typography
                                                variant="h5"
                                                fontWeight="600"
                                                color={colors.grey[100]}
                                            >
                                                Total Revenue
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                                color={colors.greenAccent[500]}
                                                style={{ display: "inline" }}
                                            >
                                                SGD&nbsp;
                                            </Typography>
                                            <Typography
                                                variant="h3"
                                                fontWeight="bold"
                                                color={colors.greenAccent[500]}
                                                style={{ display: "inline" }}
                                            >
                                                {totalRev.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box height="250px" m="-20px 0 0 0">
                                        <DailyOrderLineChart isDashboard={true} width="50%" />
                                    </Box>
                                </Box>
                                <Box
                                    gridColumn="span 4"
                                    gridRow="span 2"
                                    backgroundColor={colors.primary[400]}
                                    overflow="auto"
                                >
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        borderBottom={`4px solid ${colors.primary[500]}`}
                                        colors={colors.grey[100]}
                                        p="15px"
                                    >

                                        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                                            <ReceiptLongIcon />
                                            {' '}Recent Orders

                                        </Typography>
                                    </Box>
                                    {orderData.map((order, i) => (
                                        <Box
                                            key={`${order.orderId}-${i}`}
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            borderBottom={`4px solid ${colors.primary[500]}`}
                                            p="15px"
                                            height="20%"
                                        >
                                            <Box textAlign="left">
                                                <Typography
                                                    color={colors.greenAccent[500]}
                                                    variant="h5"
                                                    fontWeight="600"
                                                >
                                                    {order.orderId}
                                                </Typography>
                                                <Typography color={colors.grey[100]}>
                                                    {order.user.firstName}
                                                </Typography>
                                            </Box>
                                            <Box textAlign="left" color={colors.grey[100]}>
                                                {moment.utc(order.orderDate, 'YYYY-MM-DD HH:mm:ss')
                                                    .tz('Asia/Singapore')
                                                    .format('YYYY-MM-DD HH:mm:ss')}
                                            </Box>
                                            <Box
                                                backgroundColor={getOrderStatusColor(order.orderStatus)}
                                                p="5px 10px"
                                                borderRadius="4px"
                                            >
                                                {order.orderStatus}
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>

                                {/* ROW 5 */}
                                <Box
                                    gridColumn="span 12"
                                    gridRow="span 4"
                                    backgroundColor={colors.primary[400]}
                                >
                                    <Box
                                        mt="20px"
                                        p="0 30px"
                                        display="flex "
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Typography
                                            variant="h5"
                                            fontWeight="600"
                                            color={colors.grey[100]}
                                        >
                                            Total Selling MealBoxes
                                        </Typography>
                                    </Box>
                                    <Box height="200px" m="-20px 0 0 0">
                                        <TopSellingMealboxes />
                                    </Box>
                                </Box>



                            </Box>
                        </Box>
                        {/* End of Main Code Body */}

                        <Copyright sx={{ pt: 4 }} />
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>

    );
};

export default Dashboard;