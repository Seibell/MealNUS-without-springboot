import React, { useContext, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { CartContext } from "../Context/CartContext";
import NavBar from "./NavBar.js";
import { AuthContext } from "./AuthContext.js";

const Checkout = () => {
  const [cart] = useContext(CartContext);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const { currentUser } = useContext(AuthContext);

  const totalCost = cart.reduce(
    (accumulator, mealBox) => accumulator + mealBox.itemPrice * mealBox.quantity,
    0
  );

  if (!currentUser) {
    return <div>Error: User not found.</div>;
  }

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
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" component="h2" gutterBottom>
              Order Summary
            </Typography>
            {cart.map((mealBox) => (
              <Box key={mealBox.mealBoxId} mb={2}>
                <Typography>{mealBox.itemName}</Typography>
                <Typography>
                  Quantity: {mealBox.quantity} x ${mealBox.itemPrice}
                </Typography>
              </Box>
            ))}
            <Typography variant="h6" component="h2" gutterBottom>
              Total: ${totalCost.toFixed(2)}
            </Typography>
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
            <Box mt={4} mb={2}>
              <Button variant="contained" color="primary">
                Add New Card
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Box mt={2} mb={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => alert("Order confirmed")}
              >
                Confirm Order
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Checkout;