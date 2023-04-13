import {
  Box,
  ThemeProvider,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from "@mui/material";
import { tokens } from "../Statistics/theme";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import StatBox from "../Statistics/StatBox";
import NavBar from "../Navigation/NavBar";
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';

const MyOrders = () => {
  const { currentUser } = useContext(AuthContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log("currentUser: ", currentUser);
    if (currentUser && currentUser.email) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/MealNUS-war/rest/orders/email/${currentUser.email}`
          );
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
      fetchOrders();
    }
  }, [currentUser]);

  const processDataForHistogram = (orders) => {
    const filteredOrders = orders.filter(
      order => order.orderStatus === "PREPARING" ||
        order.orderStatus === "DELIVERING" ||
        order.orderStatus === "PAID"
    );
    const dateCounts = filteredOrders.reduce((acc, order) => {
      const deliveryDate = new Date(order.deliveryDate.replace('[UTC]', '')).toLocaleDateString();
      acc[deliveryDate] = (acc[deliveryDate] || 0) + 1;
      return acc;
    }, {});

    const sortedDates = Object.keys(dateCounts).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    const data = sortedDates.map((date) => ({
      date,
      "Number of Orders": dateCounts[date],
    }));

    console.log(data);
    return data;
  };

  const processDataForPieChart = (orders) => {
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(statusCounts).map((status) => ({
      id: status,
      label: status,
      value: statusCounts[status],
    }));
  };

  const statusCounts = [
    { label: "Paid", value: orders.filter(order => order.orderStatus === "PAID").length },
    { label: "Preparing", value: orders.filter(order => order.orderStatus === "PREPARING").length },
    { label: "Delivering", value: orders.filter(order => order.orderStatus === "DELIVERING").length },
    { label: "Completed", value: orders.filter(order => order.orderStatus === "COMPLETED").length },
    { label: "Cancelled", value: orders.filter(order => order.orderStatus === "CANCELLED").length },
  ];

  const statusColors = ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'];

  const handleCancelOrder = async (orderId) => {
    const confirmed = window.confirm("Are you sure you want to cancel this order?");
    if (confirmed) {
      try {
        await axios.put(
          `http://localhost:8080/MealNUS-war/rest/orders/cancel/${orderId}`
        );
        alert("Order cancelled successfully");
        // Refresh the order list
        const response = await axios.get(
          `http://localhost:8080/MealNUS-war/rest/orders/email/${currentUser.email}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error('Error cancelling order:', error);
      }
    }
  };

  if (!currentUser || !currentUser.email) {
    return <div>Loading...</div>;
  }
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Box m="20px">
        {/* GRID & CHARTS */}
        <hr />
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={orders.length}
              subtitle="Total Orders"
            />
          </Box>
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={orders.filter(order => order.orderStatus === "PAID" ||
                order.orderStatus === "PREPARING" ||
                order.orderStatus === "DELIVERING").length}
              subtitle="Orders Pending"
            />
          </Box>
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={"S$" + orders.reduce((total, order) => {
                const orderTotal = order.orderDetails.map(detail => detail.key.itemPrice * detail.value).reduce((total, price) => total + price, 0);
                return total + orderTotal;
              }, 0).toFixed(2)}
              subtitle="Total Spent"
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>
      </Box>
      <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Item Price</TableCell>
                <TableCell>Item Quantity</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Cancel Order</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                order.orderDetails.map((orderDetail) => (
                  <TableRow key={order.orderId}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{orderDetail.key.itemName}</TableCell>
                    <TableCell>{new Date(order.orderDate.replace('[UTC]', '')).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(order.deliveryDate.replace('[UTC]', '')).toLocaleDateString()}</TableCell>
                    <TableCell>{parseFloat(orderDetail.key.itemPrice).toFixed(2)}</TableCell>
                    <TableCell>{orderDetail.value}</TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleCancelOrder(order.orderId)}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Box m="20px">
        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="200px"
          gap="20px"
        >
          <Box
            gridColumn="span 6"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ResponsiveBar
              data={processDataForHistogram(orders)}
              keys={["Number of Orders"]}
              indexBy="date"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "nivo" }}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Delivery Date",
                legendPosition: "middle",
                legendOffset: 36,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Number of Orders",
                legendPosition: "middle",
                legendOffset: -40,
                tickValues: Array.from(
                  { length: Math.max(...processDataForHistogram(orders).map(item => item.y)) },
                  (_, i) => i + 1
                ), //this is broken but being broken its actually better, no axis kinda nice
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          </Box>
          <Box
            gridColumn="span 6"
            backgroundColor={colors.primary[400]}
            display="flex"
            flexDirection="column"
            padding="16px"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="h6"
              gutterBottom
              align="left"
              style={{
                marginBottom: '8px',
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                fontWeight: 'bold'
              }}
            >
              Order Status Distribution
            </Typography>
            <ResponsivePie
              data={processDataForPieChart(orders)}
              margin={{ top: 5, right: 20, bottom: 20, left: 20 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={{ scheme: 'nivo' }}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              radialLabelsSkipAngle={10}
              radialLabelsTextColor="#333333"
              radialLabelsLinkColor={{ from: "color" }}
              sliceLabelsSkipAngle={10}
              sliceLabelsTextColor="#333333"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
            <div
              style={{
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {processDataForPieChart(orders).map((status, index) => (
                <div
                  key={status.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px',
                    fontSize: '0.8rem',
                  }}
                >
                  <FiberManualRecordIcon style={{ color: statusColors[index] }} />
                  <span>{status.label}</span>
                </div>
              ))}
            </div>
          </Box>
        </Box>
      </Box>
    </ThemeProvider >
  );
};
export default MyOrders;