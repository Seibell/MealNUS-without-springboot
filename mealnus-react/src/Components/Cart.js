import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Box,
  Button,
  ButtonGroup,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NavBar from "./NavBar.js";
import { CartContext } from "../Context/CartContext.js";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const removeFromCart = (mealBox) => {
    const newCart = cart.filter((item) => item.mealBoxId !== mealBox.mealBoxId);
    setCart(newCart);
    calculateTotal(newCart);
  };

  const calculateTotal = (updatedCart) => {
    const total = updatedCart.reduce(
      (sum, item) => sum + item.itemPrice * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const updateMealBoxQuantity = (mealBoxId, increment) => {
    const updatedCart = cart.map((item) => {
      if (item.mealBoxId === mealBoxId) {
        return { ...item, quantity: Math.max(item.quantity + increment, 1) };
      }
      return item;
    });
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  useEffect(() => {
    calculateTotal(cart);
  }, [cart]);

  return (
    <div>
      <NavBar />
      <Container>
        <Box mt={4} mb={2}>
          <Typography variant="h4" component="h1">
            Your Cart
          </Typography>
        </Box>
        <List>
          {cart.map((mealBox, index) => (
            <React.Fragment key={mealBox.mealBoxId}>
              <ListItem>
                <ListItemText
                  primary={`${mealBox.itemName} (x${mealBox.quantity})`}
                  secondary={`Price: $${mealBox.itemPrice}`}
                />
                <ButtonGroup size="small" style={{ marginRight: "16px" }}>
                  <Button
                    onClick={() => updateMealBoxQuantity(mealBox.mealBoxId, -1)}
                  >
                    -
                  </Button>
                  <Box mx={1}>
                    <Typography>{mealBox.quantity}</Typography>
                  </Box>
                  <Button
                    onClick={() => updateMealBoxQuantity(mealBox.mealBoxId, 1)}
                  >
                    +
                  </Button>
                </ButtonGroup>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeFromCart(mealBox)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < cart.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Box mt={4} mb={2}>
              <Typography variant="h5" component="h2">
                Total Price: ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Box mt={2} mb={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Cart;
