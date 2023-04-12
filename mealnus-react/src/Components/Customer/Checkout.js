import React, { useContext, useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { CartContext } from "../../Context/CartContext";
import NavBar from "../Navigation/NavBar.js";
import { AuthContext } from "../../Context/AuthContext.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Checkout = () => {
  const [cart] = useContext(CartContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [inputErrors, setInputErrors] = useState({
    creditCardNumber: false,
    expiryDate: false,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [formattedCreditCardNumber, setFormattedCreditCardNumber] =
    useState("");
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.userId) {
      axios
        .get(
          `http://localhost:8080/MealNUS-war/rest/User/${currentUser.userId}/cards`
        )
        .then((response) => {
          setCards(response.data);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [currentUser]);

  function handleClickOpen() {
    setOpenDialog(true);
  }

  function handleClose() {
    setOpenDialog(false);
  }

  // Custom validation function for credit card number
  function validateCreditCardNumber(number) {
    const regex = /^(\d{4}\s){3}\d{4}$/; // 16-digit credit card number in XXXX XXXX XXXX XXXX format
    return regex.test(number);
  }

  // Custom validation function for expiry date
  function validateExpiryDate(date) {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/; // MM/YY or MM/YYYY format
    return regex.test(date);
  }

  // Function to handle changes in the credit card number input field
  function handleCreditCardNumberChange(e) {
    const value = e.target.value.replace(/\s+/g, "");
    const formattedValue =
      value
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 19) || "";
    setFormattedCreditCardNumber(formattedValue);
  }

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

  function handleSubmit(event) {
    event.preventDefault();
    const cardOwnerName = event.target.cardOwnerName.value;
    const creditCardNumber = event.target.creditCardNumber.value;
    const cvv = event.target.cvv.value;
    const expiryDate = event.target.expiryDate.value;
    const newCard = {
      cardOwnerName,
      creditCardNumber,
      cvv,
      expiryDate,
      userId: currentUser.userId,
    };

    // Validate input before sending request
    const isCardNumberValid = validateCreditCardNumber(creditCardNumber);
    const isExpiryDateValid = validateExpiryDate(expiryDate);

    setInputErrors({
      creditCardNumber: !isCardNumberValid,
      expiryDate: !isExpiryDateValid,
    });

    if (!isCardNumberValid || !isExpiryDateValid) {
      return;
    }

    axios
      .post(
        `http://localhost:8080/MealNUS-war/rest/User/${currentUser.userId}/cards`,
        newCard
      )
      .then((response) => {
        setCards([...cards, response.data]);
        setFormattedCreditCardNumber("");
        handleClose();
      })
      .catch((error) => {
        setError("Card Number already exists!");
      });
    event.target.reset();
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

  const isFutureDate = (date) => {
    const today = new Date();
    const inputDate = new Date(date);
    return inputDate.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0);
  };

  const createOrder = async () => {
    if (!cards[selectedCardIndex]) {
      setError("Please add a credit card.");
      setErrorDialogOpen(true);
      return;
    }

    if (!isFutureDate(selectedDate)) {
      setError("Please select a future delivery date.");
      setErrorDialogOpen(true);
      return;
    }

    if (!deliveryLocation) {
      setError("Please select a delivery location.");
      setErrorDialogOpen(true);
      return;
    }

    const mealBoxes = cart.map((mealBox) => mealBox);
    const quantities = cart.map((mealBox) => mealBox.quantity);

    const orderData = {
      orderDate: new Date().toISOString(),
      mealBoxes: mealBoxes,
      quantities: quantities,
      deliveryDate: selectedDate,
      address: deliveryLocation,
      orderStatus: "PAID",
      userId: currentUser.userId,
    };

    console.log(JSON.stringify(orderData));

    await axios.post("http://localhost:8080/MealNUS-war/rest/Order", orderData);

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
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" component="h2" gutterBottom>
                  Payment Information
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  Add Credit Card
                </Button>
              </Box>
              <RadioGroup
                value={selectedCardIndex}
                onChange={(e) => setSelectedCardIndex(Number(e.target.value))}
              >
                {cards.map((card, index) => (
                  <FormControlLabel
                    key={index}
                    value={index}
                    control={<Radio />}
                    label={
                      <Card
                        variant="outlined"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          padding: "8px",
                          width: "530px",
                          height: "80px",
                        }}
                      >
                        <CardContent style={{ marginTop: "10px" }}>
                          <Typography style={{ marginBottom: "8px" }}>
                            Credit Card Number: {card.creditCardNumber}
                          </Typography>
                          <Typography>
                            Expiry Date: {card.expiryDate}
                          </Typography>
                        </CardContent>
                      </Card>
                    }
                  />
                ))}
              </RadioGroup>
              <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Add Credit Card
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                  <DialogContent>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          label="Card Owner Name"
                          name="cardOwnerName"
                          fullWidth
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          label="Credit Card Number"
                          name="creditCardNumber"
                          value={formattedCreditCardNumber}
                          onChange={handleCreditCardNumberChange}
                          fullWidth
                          error={inputErrors.creditCardNumber}
                          helperText={
                            inputErrors.creditCardNumber
                              ? "Invalid credit card number"
                              : ""
                          }
                        />
                      </Grid>
                      <Grid item>
                        <TextField label="CVV" name="cvv" fullWidth />
                      </Grid>
                      <Grid item>
                        <TextField
                          label="Expiry Date (MM/YYYY)"
                          name="expiryDate"
                          fullWidth
                          error={inputErrors.expiryDate}
                          helperText={
                            inputErrors.expiryDate ? "Invalid expiry date" : ""
                          }
                        />
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button type="submit" color="primary">
                      Add Card
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
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
                    <Dialog
                      open={errorDialogOpen}
                      onClose={() => setErrorDialogOpen(false)}
                      aria-labelledby="error-dialog-title"
                    >
                      <DialogTitle id="error-dialog-title">Error</DialogTitle>
                      <DialogContent>
                        <DialogContentText>{error}</DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => setErrorDialogOpen(false)}
                          color="primary"
                        >
                          Ok
                        </Button>
                      </DialogActions>
                    </Dialog>
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
