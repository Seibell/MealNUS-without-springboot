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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Collapse,
  Rating,
} from "@mui/material";
import React from "react";
import { tokens } from "../Statistics/theme";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import StatBox from "../Statistics/StatBox";
import NavBar from "../Navigation/NavBar";
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { TabUnselected } from "@mui/icons-material";

const MyOrders = () => {
  const { currentUser } = useContext(AuthContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [newReviewDescription, setNewReviewDescription] = useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [selectedMealboxName, setSelectedMealboxName] = useState("");
  const [selectedMealboxId, setSelectedMealboxId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [reviewErrorMessage, setReviewErrorMessage] = useState("");

  useEffect(() => {
    console.log("currentUser: ", currentUser);
    if (currentUser && currentUser.userId) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/MealNUS-war/rest/orders/userId/${currentUser.userId}`
          );
          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
      fetchOrders();
    }
  }, [currentUser]);

  const processDataForHistogram = (orders) => {
    const filteredOrders = orders.filter(
      (order) =>
        order.orderStatus === "PREPARING" ||
        order.orderStatus === "DELIVERING" ||
        order.orderStatus === "PAID"
    );
    const dateCounts = filteredOrders.reduce((acc, order) => {
      const deliveryDate = new Date(
        order.deliveryDate.replace("[UTC]", "")
      ).toLocaleDateString();
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
    {
      label: "Paid",
      value: orders.filter((order) => order.orderStatus === "PAID").length,
    },
    {
      label: "Preparing",
      value: orders.filter((order) => order.orderStatus === "PREPARING").length,
    },
    {
      label: "Delivering",
      value: orders.filter((order) => order.orderStatus === "DELIVERING")
        .length,
    },
    {
      label: "Completed",
      value: orders.filter((order) => order.orderStatus === "COMPLETED").length,
    },
    {
      label: "Cancelled",
      value: orders.filter((order) => order.orderStatus === "CANCELLED").length,
    },
  ];

  const statusColors = ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb"];

  const handleCancelOrder = async (orderId, orderStatus) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (confirmed && orderStatus === "PAID") {
      console.log(orderStatus);
      try {
        await axios.put(
          `http://localhost:8080/MealNUS-war/rest/orders/cancel/${orderId}`
        );
        alert("Order cancelled successfully");
        // Refresh the order list
        const response = await axios.get(
          `http://localhost:8080/MealNUS-war/rest/orders/userId/${currentUser.userId}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error cancelling order:", error);
      }
    } else {
      console.log(orderStatus);
      alert("This order cannot be cancelled.");
    }
  };

  const handleRowClick = (orderId) => {
    const currentIndex = expandedRows.indexOf(orderId);
    const newExpandedRows = [...expandedRows];

    if (currentIndex === -1) {
      newExpandedRows.push(orderId);
    } else {
      newExpandedRows.splice(currentIndex, 1);
    }

    setExpandedRows(newExpandedRows);
  };

  const openReviewDialog = (orderId, mealboxName, mealBoxId) => {
    setSelectedOrderId(orderId);
    setSelectedMealboxName(mealboxName);
    setSelectedMealboxId(mealBoxId);
    setReviewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSuccessDialogOpen(false);
  };

  const resetReviewForm = () => {
    setNewReviewRating(1);
    setNewReviewDescription("");
    setReviewErrorMessage("");
  };

  const handleReviewSubmit = async () => {
    if (newReviewDescription.trim() === "") {
      setErrorMessage("Review description cannot be empty.");
    } else if (newReviewRating < 1) {
      setErrorMessage("Rating must be at least 1 star.");
    } else {
      const postData = {
        reviewDate: new Date().toISOString(),
        stars: newReviewRating,
        comments: newReviewDescription,
        mealBoxId: selectedMealboxId,
        userId: currentUser.userId,
      };
      console.log(JSON.stringify(postData));

      fetch("http://localhost:8080/MealNUS-war/rest/Review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }).then((response) => {
        if (response.ok) {
          setSuccess(true);
          setError("");
        } else {
          throw new Error("Something went wrong");
        }
      });

      resetReviewForm();
      setReviewDialogOpen(false);

      setSuccessDialogOpen(true);
    }
  };

  if (!currentUser || !currentUser.userId) {
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
            <StatBox title={orders.length} subtitle="Total Orders" />
          </Box>
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={
                orders.filter(
                  (order) =>
                    order.orderStatus === "PAID" ||
                    order.orderStatus === "PREPARING" ||
                    order.orderStatus === "DELIVERING"
                ).length
              }
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
              title={
                "S$" +
                orders
                  .filter((order) => order.orderStatus !== "CANCELLED")
                  .reduce((total, order) => {
                    const orderTotal = order.orderDetails
                      .map((detail) => detail.key.itemPrice * detail.value)
                      .reduce((total, price) => total + price, 0);
                    return total + orderTotal;
                  }, 0)
                  .toFixed(2)
              }
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
      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Delivery Location</TableCell>
                <TableCell>Order Cost</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, orderId) => (
                <>
                  <TableRow
                    key={order.orderId}
                    onClick={() => handleRowClick(order.orderId)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>
                      {new Date(
                        order.orderDate.replace("[UTC]", "")
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(
                        order.deliveryDate.replace("[UTC]", "")
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>
                      $
                      {order.orderDetails.reduce((total, detail) => {
                        const price = detail.key.itemPrice;
                        const quantity = detail.value;
                        return total + price * quantity;
                      }, 0)}
                    </TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleCancelOrder(order.orderId, order.orderStatus)
                        }
                        disabled={order.orderStatus !== "PAID"}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={8}
                    >
                      <Collapse
                        in={expandedRows.includes(order.orderId)}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Table size="small" aria-label="expanded-details">
                          <TableHead>
                            <TableRow>
                              <TableCell>Mealbox</TableCell>
                              <TableCell>Item Price</TableCell>
                              <TableCell>Item Quantity</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.orderDetails.map((orderDetail) => (
                              <TableRow
                                key={`${order.orderId}-${orderDetail.key.itemName}`}
                              >
                                <TableCell>
                                  {orderDetail.key.itemName}
                                </TableCell>
                                <TableCell>
                                  $
                                  {parseFloat(
                                    orderDetail.key.itemPrice
                                  ).toFixed(2)}
                                </TableCell>
                                <TableCell>{orderDetail.value}</TableCell>
                                <TableCell>
                                  {order.orderStatus === "COMPLETED" && (
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={() =>
                                        openReviewDialog(
                                          order.orderId,
                                          orderDetail.key.itemName,
                                          orderDetail.key.mealBoxId
                                        )
                                      }
                                    >
                                      Leave Review
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog
        open={reviewDialogOpen}
        onClose={() => {
          setReviewDialogOpen(false);
          resetReviewForm();
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Leave a Review</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom style={{ marginTop: "16px" }}>
            {selectedMealboxName}
          </Typography>
          <Rating
            name="rating"
            value={newReviewRating}
            onChange={(e, newValue) => setNewReviewRating(newValue)}
            precision={1}
            size="large"
            min={1}
          />
          <TextField
            label="Review"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={newReviewDescription}
            onChange={(e) => setNewReviewDescription(e.target.value)}
            error={!!errorMessage}
            helperText={errorMessage}
          />
          <Box display="flex" justifyContent="flex-end" marginTop="16px">
            <Button
              variant="contained"
              color="error"
              style={{ marginRight: "8px" }}
              onClick={() => {
                setReviewDialogOpen(false);
                resetReviewForm();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleReviewSubmit}
              style={{ marginRight: "8px" }}
            >
              Submit Review
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        open={successDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="success-dialog-title"
      >
        <DialogTitle id="success-dialog-title">Success</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have successfully left a review!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
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
                  {
                    length: Math.max(
                      ...processDataForHistogram(orders).map((item) => item.y)
                    ),
                  },
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
                marginBottom: "8px",
                fontSize: "1rem",
                whiteSpace: "nowrap",
                fontWeight: "bold",
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
              colors={{ scheme: "nivo" }}
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
                marginTop: "auto",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {processDataForPieChart(orders).map((status, index) => (
                <div
                  key={status.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "4px",
                    fontSize: "0.8rem",
                  }}
                >
                  <FiberManualRecordIcon
                    style={{ color: statusColors[index] }}
                  />
                  <span>{status.label}</span>
                </div>
              ))}
            </div>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default MyOrders;
