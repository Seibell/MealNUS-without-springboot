import React, { useState, useContext, useEffect } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  makeStyles,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { AuthContext } from "../../Context/AuthContext";

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: theme.spacing(2, 0),
  },
  textField: {
    margin: theme.spacing(1, 0),
  },
  addButton: {
    marginTop: theme.spacing(1),
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function PaymentMethodsPage() {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/currentUser/cards')
      .then((response) => {
        setCards(response.data.cards);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const cardNumber = event.target.cardNumber.value;
    const expirationDate = event.target.expirationDate.value;
    const newCard = { cardNumber, expirationDate };
    setLoading(true);
    axios
      .post('/api/currentUser/cards', newCard)
      .then((response) => {
        setCards(response.data.cards);
        setLoading(false);
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
    event.target.reset();
  }

  function handleRemoveCard(index) {
    setLoading(true);
    axios
      .delete(`/api/currentUser/cards/${cards[index].id}`)
      .then((response) => {
        setCards(response.data.cards);
        setLoading(false);
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  function handleCloseSnackbar() {
    setOpenSnackbar(false);
  }

  return (
    <div>
      <h1>Payment Methods</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField label="Card Number" name="cardNumber" className={classes.textField} />
        <TextField label="Expiration Date" name="expirationDate" className={classes.textField} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.addButton}
          disabled={loading}
        >
          Add Card
        </Button>
      </form>
      {
        loading ? (
          <CircularProgress />
        ) : (
          <List>
            {cards.map((card, index) => (
              <ListItem key={index} className={classes.listItem}>
                <ListItemText primary={`${card.cardNumber} (${card.expirationDate})`} />
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveCard(index)} disabled={loading}>
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )
      }
      {error && <MuiAlert severity="error">{error}</MuiAlert>}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <MuiAlert severity="success">Card successfully {error ? 'updated' : 'added'}!</MuiAlert>
      </Snackbar>
    </div >
  );
}

export default PaymentMethodsPage;