import React, { useContext, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { CartContext } from "../../Context/CartContext";
import NavBar from "../Navigation/NavBar.js";
import { AuthContext } from "../../Context/AuthContext.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Checkout = () => {
  const [cart] = useContext(CartContext);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');


  const totalCost = cart.reduce(
    (accumulator, mealBox) =>
      accumulator + mealBox.itemPrice * mealBox.quantity,
    0
  );

  if (!currentUser) {
    return <div>Error: User not found.</div>;
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit">MealNUS</Link> {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const createOrder = async () => {
    // Prepare the order details
    const orderDetails = cart.map((mealBox) => ({
      mealBox: mealBox,
      quantity: mealBox.quantity,
    }));

    const orderData = {
      orderDate: new Date(),
      orderDetails: orderDetails,
      deliveryDate: selectedDate,
      address: deliveryLocation,
      orderStatus: "PENDING",
      user: currentUser.uid, // Assuming the user object has a uid property
    };

    console.log(JSON.stringify(orderData));

    // Send a POST request with the order data
    fetch("http://localhost:8080/MealNUS-war/rest/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (response.ok) {
          setSuccess(true);
          setError("");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <NavBar />
      <Container>
        <Box mt={4} mb={2}>
          <Typography variant="h4" component="h1">
            Checkout
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2" gutterBottom>
              Order Summary
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mealbox</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((mealBox) => (
                    <TableRow key={mealBox.mealBoxId}>
                      <TableCell>
                        <img
                          src={mealBox.itemImage}
                          alt={mealBox.itemName}
                          width="100"
                          height="100"
                        />
                        <span style={{ marginLeft: "8px" }}>
                          {mealBox.itemName}
                        </span>
                      </TableCell>
                      <TableCell align="right">{mealBox.quantity}</TableCell>
                      <TableCell align="right">
                        ${mealBox.itemPrice.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        ${(mealBox.itemPrice * mealBox.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      align="right"
                      style={{ paddingRight: "8px" }}
                    >
                      <Typography variant="h6" component="h2" gutterBottom>
                        Total Price:
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6" component="h2" gutterBottom>
                        ${totalCost.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Box mt={4} mb={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h2" gutterBottom>
                Scheduled Delivery Date:
              </Typography>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
                customInput={
                  <TextField
                    label="Delivery Date"
                    variant="outlined"
                    style={{ minWidth: "80%" }}
                  />
                }
              />
              <Box mt={4}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Delivery Location:
                </Typography>
                <FormControl variant="outlined" style={{ minWidth: "80%" }}>
                  <InputLabel id="delivery-location-label">
                    Delivery Location
                  </InputLabel>
                  <Select
                    labelId="delivery-location-label"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    label="Select Location"
                  >
                    <MenuItem value="EUSOFF_HALL">Eusoff Hall</MenuItem>
                    <MenuItem value="UTOWN_RESIDENCES">
                      Utown Residences
                    </MenuItem>
                    <MenuItem value="TEMBUSU_COLLEGE">Tembusu College</MenuItem>
                    <MenuItem value="RESIDENTIAL_COLLEGE_FOUR">
                      Residential College Four
                    </MenuItem>
                    <MenuItem value="PRINCE_GEORGE_PARK_RESIDENCE">
                      Prince George Park Residence
                    </MenuItem>
                    <MenuItem value="RIDGE_VIEW_RESIDENTIAL_COLLEGE">
                      Ridge View Residential College
                    </MenuItem>
                    <MenuItem value="RAFFLES_HALL">Raffles Hall</MenuItem>
                    <MenuItem value="TEMASEK_HALL">Temasek Hall</MenuItem>
                    <MenuItem value="KENT_RIDGE_HALL">Kent Ridge Hall</MenuItem>
                    <MenuItem value="SHEARES_HALL">Sheares Hall</MenuItem>
                    <MenuItem value="KING_EDWARD_VII_HALL">
                      King Edward VII Hall
                    </MenuItem>
                    <MenuItem value="KENT_VALE">Kent Vale</MenuItem>
                    <MenuItem value="UNIVERSITY_HALL">University Hall</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h2" gutterBottom>
                Payment Information
              </Typography>
              <TextField
                fullWidth
                label="Cardholder Name"
                variant="outlined"
                style={{ marginBottom: "16px" }}
              />
              <TextField
                fullWidth
                label="Card Number"
                variant="outlined"
                style={{ marginBottom: "16px" }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    variant="outlined"
                    placeholder="MM/YY"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    variant="outlined"
                    inputProps={{ maxLength: 3 }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Box mt={2} mb={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={createOrder}
                    >
                      Confirm Order
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </div>
  );
};

export default Checkout;
