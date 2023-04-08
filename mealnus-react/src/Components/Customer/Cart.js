import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  ButtonGroup,
  Link,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NavBar from "../Navigation/NavBar.js";
import { CartContext } from "../../Context/CartContext.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext.js";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const removeFromCart = (mealBox) => {
    const newCart = cart.filter((item) => item.mealBoxId !== mealBox.mealBoxId);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
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
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  useEffect(() => {
    calculateTotal(cart);
  }, [cart]);

  if (!currentUser) {
    return <div>Error: User not found.</div>;
  }

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

  return (
    <div>
      <NavBar />
      <Container>
        <Box mt={4} mb={2}>
          <Typography variant="h4" component="h1">
            Your Cart
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mealbox</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Subtotal</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((mealBox) => (
                <TableRow key={mealBox.mealBoxId}>
                  <TableCell component="th" scope="row">
                    <Box display="flex" alignItems="center">
                      <img
                        src={mealBox.itemImage}
                        alt={mealBox.itemName}
                        style={{
                          width: "80px",
                          height: "80px",
                          marginRight: "16px",
                        }}
                      />
                      {mealBox.itemName}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    ${mealBox.itemPrice.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <ButtonGroup size="small" style={{ marginLeft: "10px" }}>
                      <Button
                        onClick={() =>
                          updateMealBoxQuantity(mealBox.mealBoxId, -1)
                        }
                      >
                        -
                      </Button>
                      <Box mx={1}>
                        <Typography>{mealBox.quantity}</Typography>
                      </Box>
                      <Button
                        onClick={() =>
                          updateMealBoxQuantity(mealBox.mealBoxId, 1)
                        }
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell align="right">
                    ${(mealBox.itemPrice * mealBox.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeFromCart(mealBox)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </div>
  );
};

export default Cart;
