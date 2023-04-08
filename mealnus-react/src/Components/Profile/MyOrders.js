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
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import StatBox from "../Statistics/StatBox";
import NavBar from "../Navigation/NavBar";
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';

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
          const ordersWithNumber = response.data.map((order, index) => ({ ...order, orderNumber: index + 1 }));
          setOrders(ordersWithNumber);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

      fetchOrders();
    }
  }, [currentUser]);

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
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
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
                <PersonAddIcon
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
                <TableCell>Order Number</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Item Price</TableCell>
                <TableCell>Item Quantity</TableCell>
                <TableCell>Order Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                order.orderDetails.map((orderDetail) => (
                  <TableRow key={order.orderNumber}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>{orderDetail.key.itemName}</TableCell>
                    <TableCell>{new Date(order.orderDate.replace('[UTC]', '')).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(order.deliveryDate.replace('[UTC]', '')).toLocaleDateString()}</TableCell>
                    <TableCell>{parseFloat(orderDetail.key.itemPrice).toFixed(2)}</TableCell>
                    <TableCell>{orderDetail.value}</TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
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
            <StatBox
              title="Some graph to show order histogram"
              subtitle="?"
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
              title="Some calendar to show what dates orders are coming in"
              subtitle="?"
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider >
  );
};

export default MyOrders;