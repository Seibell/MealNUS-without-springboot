///this one is the current no working one
import "../MealBoxes.css";
import Axios from "axios";
import NavBar from "./NavBar.js";
//import { parseISO, format } from "date-fns";
import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  Chip,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ButtonGroup,
  ListItemAvatar,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const MealBoxes = () => {
  const [mealBoxes, setMealBoxes] = useState([]);
  const [selectedMealBox, setSelectedMealBox] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    Axios.get(
      "http://localhost:8080/MealNUS-war/rest/Mealbox/retrieveAllMealBoxes"
    )
      .then((response) => {
        setMealBoxes(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClickOpen = (mealBox) => {
    setSelectedMealBox(mealBox);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setQuantity(0);
    setOpenDialog(false);
  };
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (increment) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + increment;
      return newQuantity < 0 ? 0 : newQuantity;
    });
  };
  return (
    <div>
      <NavBar />
      <Container>
        <Box mt={4} mb={2}></Box>
        <Grid container spacing={3}>
          {Array.isArray(mealBoxes.mealBoxEntities) &&
            mealBoxes.mealBoxEntities.map((mealBox) => (
              <Grid item key={mealBox.mealBoxId} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardActionArea onClick={() => handleClickOpen(mealBox)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={mealBox.itemImage}
                      alt={mealBox.itemName}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        noWrap
                      >
                        {mealBox.itemName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        Price: ${mealBox.itemPrice}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {mealBox.quantityAvailable} available
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" variant="contained" color="primary">
                      Order Now
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<ShoppingCartIcon />}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedMealBox?.itemName}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <img
                src={selectedMealBox?.itemImage}
                alt={selectedMealBox?.itemName}
                style={{ width: "100%", objectFit: "cover" }}
              />
              <DialogContentText>
                Price: ${selectedMealBox?.itemPrice}
              </DialogContentText>
              <DialogContentText>
                {selectedMealBox?.quantityAvailable} available
              </DialogContentText>
              <DialogContentText>
                Description: {selectedMealBox?.itemDescription}
              </DialogContentText>
              <DialogContentText>Ingredients:</DialogContentText>
              <div>
                {selectedMealBox?.ingredients?.map((ingredient) => (
                  <Chip
                    key={ingredient.id}
                    avatar={
                      <Avatar src={ingredient.picture} alt={ingredient.name} />
                    }
                    label={ingredient.name}
                    style={{ margin: "0 5px 5px 0" }}
                  />
                ))}
              </div>
              <DialogContentText>Category:</DialogContentText>
              <div>
                {selectedMealBox?.categories?.map((category) => (
                  <Chip
                    key={category.id}
                    avatar={
                      <Avatar src={category.picture} alt={category.name} />
                    }
                    label={category.name}
                    style={{ margin: "0 5px 5px 0" }}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Reviews
              </Typography>
              <List>
                {selectedMealBox?.reviews?.map((review) => (
                  <ListItem key={review.reviewId} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>{review.user.firstName.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          {review.user.firstName} {review.user.lastName}{" "}
                          <span
                            style={{
                              fontWeight: "normal",
                              fontSize: "0.8em",
                              marginLeft: "8px",
                            }}
                          >
                            {new Date(
                              review.reviewDate.replace("[UTC]", "")
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </>
                      }
                      secondary={review.comments}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item>
              <ButtonGroup style={{ gap: "8px" }}>
                <Button onClick={() => handleQuantityChange(-1)}>-</Button>
                <Typography>{quantity}</Typography>
                <Button onClick={() => handleQuantityChange(1)}>+</Button>
              </ButtonGroup>
            </Grid>
            <Grid item>
              <Button size="small" variant="contained" color="primary">
                Order Now
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="outlined"
                startIcon={<ShoppingCartIcon />}
              >
                Add to Cart
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MealBoxes;