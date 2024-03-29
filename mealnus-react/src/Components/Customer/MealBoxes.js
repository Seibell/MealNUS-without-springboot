///this one is the current no working one
import Axios from "axios";
import NavBar from "../Navigation/NavBar.js";
import "./MealBoxes.css";
//import { parseISO, format } from "date-fns";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Avatar, Box, Button, ButtonGroup, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Container, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Grid, List,
  ListItem, ListItemAvatar, ListItemText, Typography
} from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";

const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;

  const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
  return totalStars / reviews.length;
};

const MealBoxes = () => {
  const [mealBoxes, setMealBoxes] = useState({ mealBoxEntities: [] });
  const [selectedMealBox, setSelectedMealBox] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const history = useNavigate();
  const [cart, setCart] = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const averageRating = calculateAverageRating(selectedMealBox?.reviews);
  const [cartQuantity, setCartQuantity] = useState(0);
  const location = useLocation();

  const navigate = useNavigate();

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
  }, [location]);

  const getUniqueCategories = () => {
    const allCategories = mealBoxes.mealBoxEntities.flatMap(
      (mealBox) => mealBox.categories
    );
    const filteredCategories = allCategories.filter(
      (category) => category.name !== "Site-Wide"
    );
    const uniqueCategories = Array.from(
      new Set(filteredCategories.map((category) => category.name))
    ).map((name) => {
      return filteredCategories.find((category) => category.name === name);
    });
    return uniqueCategories;
  };

  const getFilteredMealBoxes = () => {
    return mealBoxes.mealBoxEntities.filter((mealBox) => {
      const isNameMatch = mealBox.itemName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const isCategoryMatch = selectedCategory
        ? mealBox.categories.some(
            (category) => category.name === selectedCategory
          )
        : true;
      return isNameMatch && isCategoryMatch;
    });
  };

  const handleClickOpen = (mealBox) => {
    const cartMealBox = cart.find(
      (item) => item.mealBoxId === mealBox.mealBoxId
    );
    setCartQuantity(cartMealBox ? cartMealBox.quantity : 0);
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
      if (newQuantity < 0) return 0;

      const totalQuantity = cartQuantity + newQuantity;

      if (totalQuantity > selectedMealBox?.quantityAvailable) {
        alert("You cannot order more than the available quantity");
        return prevQuantity;
      }
      return newQuantity;
    });
  };

  const handleOrderNow = (mealBox, quantity) => {
    if (quantity <= 0) {
      alert("Please select a quantity greater than 0");
      return;
    }

    setCart((prevCart) => {
      const existingMealBoxIndex = prevCart.findIndex(
        (item) => item.mealBoxId === mealBox.mealBoxId
      );

      if (existingMealBoxIndex >= 0) {
        const updatedCart = [...prevCart];
        const updatedQuantity =
          updatedCart[existingMealBoxIndex].quantity + quantity;

        if (updatedQuantity > mealBox.quantityAvailable) {
          alert("You cannot order more than the available quantity");
          return prevCart;
        }

        updatedCart[existingMealBoxIndex].quantity = updatedQuantity;
        return updatedCart;
      } else {
        if (quantity > mealBox.quantityAvailable) {
          alert("You cannot order more than the available quantity");
          return prevCart;
        }
        return [...prevCart, { ...mealBox, quantity }];
      }
    });

    navigate("/cart");
  };

  const handleAddToCart = (mealBox, quantity) => {
    if (quantity <= 0) {
      alert("Please select a quantity greater than 0");
      return;
    }

    const newMealBox = { ...mealBox, quantity };
    setCart((prevCart) => {
      const existingMealBoxIndex = prevCart.findIndex(
        (item) => item.mealBoxId === newMealBox.mealBoxId
      );
      if (existingMealBoxIndex >= 0) {
        const updatedCart = [...prevCart];
        const updatedQuantity =
          updatedCart[existingMealBoxIndex].quantity + quantity;
        if (updatedQuantity > mealBox.quantityAvailable) {
          alert("You cannot order more than the available quantity");
          return prevCart;
        }
        updatedCart[existingMealBoxIndex].quantity = updatedQuantity;
        return updatedCart;
      } else {
        return [...prevCart, newMealBox];
      }
    });

    setQuantity(0);
    handleClose();
  };

  if (!currentUser) {
    return <div>Error: User not found.</div>;
  }

  return (
    <div>
      {/* <div className="home-bannerImage-container">
        <img src={BannerBackground} alt="" />
      </div> */}
      <NavBar />
      <Container>
        <Box mt={4} mb={2}>
          {/* Add a search bar */}
          <TextField
            label="Search by Name"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              marginRight: "1rem",
              width: "80%", // Increase the width
            }}
            InputProps={{
              style: {
                borderColor: "orange",
              },
              // Change the border color
              classes: {
                notchedOutline: "textFieldOutline",
              },
            }}
            InputLabelProps={{
              // Update the label color
              style: { color: "orange" },
            }}
          />
          {/* Add a category filter */}
          <FormControl variant="outlined" style={{ minWidth: "13.1rem" }}>
            {/* Increase the width */}
            <InputLabel style={{ color: "#003865" }}>
              Filter by Category
            </InputLabel>{" "}
            {/* Change the title and color */}
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Filter by Category"
              style={{ color: "#003865" }} // Change the color
            >
              <MenuItem value="">
                <em>Site Wide</em>
              </MenuItem>
              {/* Add unique categories here */}
              {getUniqueCategories().map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={3}>
          {Array.isArray(getFilteredMealBoxes()) &&
            getFilteredMealBoxes().map((mealBox) => (
              <Grid item key={mealBox.mealBoxId} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardActionArea onClick={() => handleClickOpen(mealBox)}>
                    <CardMedia
                      component="img"
                      //height="140"
                      style={{
                        height: "300px",
                        width: "300px",
                        objectFit: "cover",
                      }}
                      image={mealBox.itemImage}
                      alt={mealBox.itemName}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{
                          fontWeight: "bold",
                          color: "#0077c2",
                          textAlign: "center",
                        }}
                        noWrap
                      >
                        {mealBox.itemName}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          fontWeight: 500,
                          fontSize: "1.2rem",
                          color: "#FFA500",
                          textAlign: "center",
                        }}
                        noWrap
                      >
                        Price: ${mealBox.itemPrice.toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          textAlign: "center",
                          color:
                            mealBox.quantityAvailable === 0
                              ? "red"
                              : "text.secondary",
                        }}
                        noWrap
                      >
                        {mealBox.quantityAvailable === 0
                          ? "Sold Out"
                          : `${mealBox.quantityAvailable} available`}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => handleOrderNow(mealBox, 1)}
                      disabled={mealBox.quantityAvailable === 0}
                    >
                      Order Now
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleAddToCart(mealBox, 1)}
                      disabled={mealBox.quantityAvailable === 0}
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
                style={{ width: "88%", objectFit: "cover" }}
                // style={{ width: "288px", height: "288px", objectFit: "cover" }}
              />
              <Typography
                variant="subtitle1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <b>Price: </b>&nbsp;{selectedMealBox?.itemPrice.toFixed(2)}
                <Box sx={{ flexGrow: 1 }} />
                {selectedMealBox?.quantityAvailable === 0 ? (
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "red", marginRight: 6.5 }}
                  >
                    <b>Sold Out</b>
                  </Typography>
                ) : (
                  <>
                    <span>{selectedMealBox?.quantityAvailable}</span>
                    <Box sx={{ width: 4 }} />
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "green", marginRight: 6.5 }}
                    >
                      <b>available</b>
                    </Typography>
                  </>
                )}
              </Typography>
              <Typography variant="subtitle1">
                <b>Description:</b> {selectedMealBox?.itemDescription}
              </Typography>
              <Typography variant="subtitle1">
                <b>Ingredients:</b>
              </Typography>
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
              <Typography variant="subtitle1">
                <b>Category:</b>
              </Typography>
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
              <Typography variant="subtitle1">
                <b>Allergens:</b>
              </Typography>
              <div>
                {selectedMealBox?.allergens?.length ? (
                  selectedMealBox?.allergens?.map((allergen) => (
                    <Chip
                      key={allergen.allergenId}
                      avatar={<Avatar alt={allergen.allergenName} />}
                      label={allergen.allergenName}
                      style={{ margin: "0 5px 5px 0" }}
                    />
                  ))
                ) : (
                  <DialogContentText>N.A.</DialogContentText>
                )}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <h2>
                Reviews{" "}
                <span style={{ fontSize: "0.8em", marginLeft: "8px" }}>
                  (Overall Rating: {averageRating.toFixed(1)})
                </span>
              </h2>
              <ReactStars
                count={5}
                value={averageRating}
                size={30} // Increase the size value as desired
                isHalf={true}
                edit={false}
                activeColor="#ffd700"
                style={{ marginLeft: "8px" }}
              />
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
                          <ReactStars
                            count={5}
                            value={review.stars}
                            size={16}
                            isHalf={false}
                            edit={false}
                            activeColor="#ffd700"
                            style={{ marginLeft: "8px" }}
                          />
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
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => handleOrderNow(selectedMealBox, quantity)}
                disabled={selectedMealBox?.quantityAvailable === 0}
              >
                Order Now
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="outlined"
                startIcon={<ShoppingCartIcon />}
                onClick={() => handleAddToCart(selectedMealBox, quantity)}
                disabled={selectedMealBox?.quantityAvailable === 0}
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