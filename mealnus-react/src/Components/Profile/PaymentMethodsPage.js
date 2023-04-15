import MuiAlert from '@mui/lab/Alert';
import {
  Box, Button, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Grid, Snackbar, TextField, ThemeProvider, useTheme
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import NavBar from '../Navigation/NavBar';
import CreditCardDisplay from './CreditCardDisplay';

function PaymentMethodsPage() {
  const { currentUser } = useContext(AuthContext);
  const theme = useTheme();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [cardToRemove, setCardToRemove] = useState(null);
  const [formattedCreditCardNumber, setFormattedCreditCardNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  //validation state for ccNum/Date
  const [inputErrors, setInputErrors] = useState({
    creditCardNumber: false,
    expiryDate: false,
  });

  useEffect(() => {
    if (currentUser && currentUser.userId) {
      setLoading(true);
      axios
        .get(`http://localhost:8080/MealNUS-war/rest/User/${currentUser.userId}/cards`)
        .then((response) => {
          setCards(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
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

  if (!currentUser || !currentUser.email) {
    return <div>Loading...</div>;
  }

  // Function to handle changes in the credit card number input field
  function handleCreditCardNumberChange(e) {
    const value = e.target.value.replace(/\s+/g, '');
    const formattedValue = value
      .match(/.{1,4}/g)
      ?.join(' ')
      .substr(0, 19) || '';
    setFormattedCreditCardNumber(formattedValue);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const cardOwnerName = event.target.cardOwnerName.value;
    const creditCardNumber = event.target.creditCardNumber.value;
    const cvv = event.target.cvv.value;
    const expiryDate = event.target.expiryDate.value;
    const newCard = { cardOwnerName, creditCardNumber, cvv, expiryDate, userId: currentUser.userId };

    // Validate input before sending request
    const isCardNumberValid = validateCreditCardNumber(creditCardNumber);
    const isExpiryDateValid = validateExpiryDate(expiryDate);

    setInputErrors({
      creditCardNumber: !isCardNumberValid,
      expiryDate: !isExpiryDateValid,
    });

    if (!cardOwnerName || !creditCardNumber || !cvv || !expiryDate) {
      setError('Please fill in all fields');
      return;
    }

    if (!isCardNumberValid || !isExpiryDateValid) {
      return;
    }

    setLoading(true);

    axios
      .post(`http://localhost:8080/MealNUS-war/rest/User/${currentUser.userId}/cards`, newCard)
      .then((response) => {
        setCards([...cards, response.data]);
        setLoading(false);
        setOpenSnackbar(true);
        setSuccessMessage('Credit card added successfully!');
        setFormattedCreditCardNumber('');
        handleClose();
      })
      .catch((error) => {
        setError("Card Number already exists!");
        setLoading(false);
      });
    event.target.reset();
  }

  function handleRemoveCardDialog(cardId, index) {
    setCardToRemove({ cardId, index });
  }

  function handleRemoveCard() {
    if (cardToRemove) {
      setLoading(true);
      axios
        .delete(`http://localhost:8080/MealNUS-war/rest/User/${currentUser.userId}/cards/${cardToRemove.cardId}`)
        .then(() => {
          const updatedCards = cards.filter((_, i) => i !== cardToRemove.index);
          setCards(updatedCards);
          setLoading(false);
          setOpenSnackbar(true);
          setSuccessMessage('Credit card removed!');
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
      setCardToRemove(null);
    }
  }

  function handleCloseSnackbar() {
    setOpenSnackbar(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <NavBar />
        <Box style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <h1>Payment Methods</h1>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Credit Card
          </Button>
          <hr />
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {cards.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <CreditCardDisplay
                    card={card}
                    index={index}
                    handleRemoveCardDialog={handleRemoveCardDialog}
                    loading={loading}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          {error && <MuiAlert severity="error">{error}</MuiAlert>}
          <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <MuiAlert severity="success">{successMessage}</MuiAlert>
          </Snackbar>
          <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Credit Card</DialogTitle>
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField label="Card Owner Name" name="cardOwnerName" fullWidth />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Credit Card Number"
                      name="creditCardNumber"
                      value={formattedCreditCardNumber}
                      onChange={handleCreditCardNumberChange}
                      fullWidth
                      error={inputErrors.creditCardNumber}
                      helperText={inputErrors.creditCardNumber ? 'Invalid credit card number' : ''}
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
                      helperText={inputErrors.expiryDate ? 'Invalid expiry date' : ''}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={loading}>
                  Add Card
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          <Dialog
            open={!!cardToRemove}
            onClose={() => setCardToRemove(null)}
            aria-labelledby="remove-card-dialog-title"
          >
            <DialogTitle id="remove-card-dialog-title">Remove Card</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to remove this card?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setCardToRemove(null)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleRemoveCard} color="primary" autoFocus>
                Remove
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default PaymentMethodsPage;