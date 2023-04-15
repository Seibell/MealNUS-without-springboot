import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import NavBar from "../Navigation/NavBar.js";
import BannerBackground from "../../Assets/home-banner-background.png";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";

import { ThumbUp, ThumbDown } from "@material-ui/icons";
import { AuthContext } from "../../Context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8),
    minWidth: 100,
  },
  paper: {
    padding: theme.spacing(2),
    width: "90%",
    margin: "auto",
    marginBottom: theme.spacing(2),
    backgroundColor: "#FFEFD5",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    position: "relative",
  },
  replyCard: {
    marginBottom: theme.spacing(2),
  },
  replyCardContent: {
    paddingBottom: 0,
  },
  scrollableContainer: {
    maxHeight: "300px", // Adjust this value based on the desired maximum height
    overflowY: "auto",
    marginBottom: theme.spacing(2),
  },
  userImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: theme.spacing(1),
  },
  userContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  thumbContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    // marginTop: "auto",
  },
  thumbIcon: {
    fontSize: "25px",
  },
  thumbCount: {
    marginLeft: theme.spacing(1),
  },
  time: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    marginTop: theme.spacing(1),
  },
}));

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");
  const [filter, setFilter] = React.useState("");
  const [userLikes, setUserLikes] = useState({});
  const [userDislikes, setUserDislikes] = useState({});
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [replyText, setReplyText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get(
      "http://localhost:8080/MealNUS-war/rest/Forum/retrieveAllForumPosts"
    );
    setPosts(response.data);
  };

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplyButtonClick = async () => {
    const data = {
      postDate: new Date().toISOString(), // Current date and time
      postDescription: replyText,
      postId: selectedPost.postId,
      postTitle: "",
      userId: currentUser.userId,
    };

    await axios.post(
      "http://localhost:8080/MealNUS-war/rest/Forum/createNewForumPostReply",
      data
    );

    // Add the new reply to the replies state
    const newReply = {
      postDate: data.postDate,
      postDescription: data.postDescription,
      user: {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
      },
    };

    setReplies((replies) => replies.concat(newReply));

    setReplyText("");
    fetchPosts();
  };

  const getFilteredPosts = () => {
    return posts.forumPostEntities.filter((post) => {
      const isNameMatch = post.posTitle
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const isContentMatch = post.postDescription
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return isNameMatch || isContentMatch;
    });
  };

  const createNewPost = async () => {
    if (newPostTitle === "" || newPostDescription === "") {
      setErrorMessage("Please enter both the title and description.");
      return;
    }

    setErrorMessage("");

    const postData = {
      postDate: new Date().toISOString(),
      postTitle: newPostTitle,
      postDescription: newPostDescription,
      userId: currentUser.userId, // Assuming currentUser has an "id" field
    };

    await axios.post(
      "http://localhost:8080/MealNUS-war/rest/Forum/createNewForumPost",
      postData
    );
    fetchPosts();
    setNewPostTitle("");
    setNewPostDescription("");
  };

  const closeErrorSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage("");
  };
  const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false);

  const handleOpenCreatePostDialog = () => {
    setOpenCreatePostDialog(true);
  };

  const handleCloseCreatePostDialog = () => {
    setOpenCreatePostDialog(false);
  };

  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const handleClickOpen = (post) => {
    setSelectedPost(post);
    setReplies(post.replies);
    setOpenReplyDialog(true);
  };

  const handleClose = () => {
    setOpenReplyDialog(false);
  };

  const handleThumbUp = async (postId, userId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/MealNUS-war/rest/Forum/thumbsUpForumPost/${postId}?userId=${userId}`
      );
      if (response.status === 200) {
        fetchPosts();
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("You already liked this post.");
      }
    }
  };

  const handleThumbDown = async (postId, userId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/MealNUS-war/rest/Forum/thumbsDownForumPost/${postId}?userId=${userId}`
      );
      if (response.status === 200) {
        fetchPosts();
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("You already disliked this post.");
      }
    }
  };

  const [errorMessage, setErrorMessage] = React.useState("");

  if (!currentUser) {
    return <div>Error: User not found.</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="home-bannerImage-container">
        <img src={BannerBackground} alt="" />
      </div>
      <NavBar />
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          style={{ fontFamily: "Poppinsdi" }}
        >
          Welcome to the Forum!
        </Typography>
        {/* Create New Post Button */}
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
            {/* Add a search bar */}
            <TextField
              label="Search by Keyword"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                marginRight: "2rem",
                marginLeft: "4rem",
                width: "50%", // Increase the width
                borderColor: "#0077B5", // Change the border color to NUS blue
              }}
              InputProps={{
                style: {
                  borderColor: "#0077B5", // Change the border color to NUS blue
                },
                // Change the border color
                classes: {
                  notchedOutline: "textFieldOutline",
                },
              }}
              InputLabelProps={{
                // Update the label color
                style: { color: "#0077B5" }, // Change the label color to NUS blue
              }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenCreatePostDialog}
              style={{
                marginBottom: 15,
                backgroundColor: "#0077B5", // NUS orange color#FF8C00
                borderRadius: 25,
                padding: "10px 30px", // Add padding to the button (top/bottom, left/right)
                minWidth: 150, // Set a minimum width for the button
                maxHeight: 60, // Set a minimum height for the button
                color: "white", // Set the text color if needed
                marginLeft: "1rem", // Add some margin to separate the button from the search bar
                marginRight: "3rem",
              }}
            >
              Create New Post
            </Button>

            <FormControl
              className={classes.formControl}
              style={{ marginLeft: "1rem", marginTop: 30 }}
            >
              <InputLabel id="filter-select-label">Filter By</InputLabel>
              <Select
                labelId="filter-select-label"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>{" "}
                {/* Add an empty value as default */}
                <MenuItem value="time">Latest Posts</MenuItem>
                <MenuItem value="popularityUp">ThumbUp: High to Low</MenuItem>
                <MenuItem value="popularityDown">
                  ThumbDown: High to Low
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{}}>
          <Grid container spacing={3}></Grid>
          <Grid
            container
            spacing={2}
            style={{ height: "70vh", overflow: "auto" }}
          >
            {posts.forumPostEntities &&
              getFilteredPosts()
                // [...posts.forumPostEntities]
                .sort((a, b) => {
                  if (filter === "time") {
                    return (
                      new Date(b.postDate.replace("[UTC]", "")) -
                      new Date(a.postDate.replace("[UTC]", ""))
                    );
                  } else if (filter === "popularityUp") {
                    return b.numThumbsUp - a.numThumbsUp;
                  } else {
                    return b.numThumbsDown - a.numThumbsDown;
                  }
                })
                .map((post) => (
                  <Grid item xs={12} key={post.postId}>
                    <Paper className={classes.paper} elevation={2}>
                      <Typography variant="h5" gutterBottom>
                        <strong>{post.posTitle}</strong>
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {post.postDescription}
                      </Typography>
                      <div className={classes.userContainer}>
                        {post.user.imageURL && (
                          <img
                            src={post.user.imageURL}
                            alt={`${post.user.firstName} ${post.user.lastName}`}
                            className={classes.userImage}
                          />
                        )}
                        <Typography variant="body2">
                          Posted by {post.user.firstName} {post.user.lastName}
                        </Typography>
                      </div>
                      <div className={classes.thumbContainer}>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <IconButton
                            aria-label="thumbs up"
                            onClick={() =>
                              handleThumbUp(post.postId, currentUser.userId)
                            }
                          >
                            <ThumbUp className={classes.thumbIcon} />
                          </IconButton>
                          <Typography className={classes.thumbCount}>
                            {post.numThumbsUp}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: 16,
                          }}
                        >
                          <IconButton
                            aria-label="thumbs down"
                            onClick={() =>
                              handleThumbDown(post.postId, currentUser.userId)
                            }
                          >
                            <ThumbDown className={classes.thumbIcon} />
                          </IconButton>
                          <Typography className={classes.thumbCount}>
                            {post.numThumbsDown}
                          </Typography>
                        </div>
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleClickOpen(post)}
                        style={{ margin: "auto", backgroundColor: "orange" }}
                      >
                        View Reply
                      </Button>
                      <Typography variant="body2" className={classes.time}>
                        {new Date(
                          post.postDate.replace("[UTC]", "")
                        ).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          hour12: false,
                        })}
                      </Typography>
                    </Paper>
                    <Dialog
                      open={openReplyDialog}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-title"
                      maxWidth="xl"
                      maxHeight="xl"
                      fullWidth
                      //fullScreen
                      PaperProps={{
                        style: {
                          maxHeight: "180vh",
                        },
                      }}
                    >
                      <DialogTitle id="form-dialog-title">
                        Replies to the post
                      </DialogTitle>
                      <DialogContent>
                        <Box className={classes.scrollableContainer}>
                          {replies.map((reply, index) => (
                            <Card key={index} className={classes.replyCard}>
                              <CardContent className={classes.replyCardContent}>
                                {/* <Typography
                                  variant="subtitle1"
                                  gutterBottom
                                  style={{
                                    fontWeight: "bold",
                                    color: "#FF8C00", // Dark orange color
                                  }}
                                >
                                  {reply.posTitle}
                                </Typography> */}
                                <Typography variant="body1">
                                  {reply.postDescription}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Typography
                                  variant="caption"
                                  color="textSecondary"
                                >
                                  {new Date(
                                    reply.postDate.replace("[UTC]", "")
                                  ).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                    hour12: false,
                                  })}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="textSecondary"
                                >
                                  Posted by {reply.user.firstName}{" "}
                                  {reply.user.lastName}
                                </Typography>
                              </CardActions>
                            </Card>
                          ))}
                        </Box>
                        <DialogContentText>
                          Write your reply to this post here.
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="reply"
                          label="Reply"
                          type="text"
                          fullWidth
                          value={replyText}
                          onChange={handleReplyChange}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleReplyButtonClick}
                          disabled={!replyText.trim()}
                          style={{
                            margin: "auto",
                            backgroundColor: "orange",
                            //position: "absolute",
                            bottom: "0",
                            top: "5px",
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        >
                          Reply to this post
                        </Button>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                ))}
          </Grid>
          <Dialog
            open={openCreatePostDialog}
            onClose={handleCloseCreatePostDialog}
            aria-labelledby="create-post-dialog-title"
            maxWidth="md"
            fullWidth
          >
            <DialogTitle id="create-post-dialog-title">
              Create New Post
            </DialogTitle>
            <DialogContent>
              <TextField
                label="Title"
                fullWidth
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={4}
                value={newPostDescription}
                onChange={(e) => setNewPostDescription(e.target.value)}
                style={{ marginTop: 16 }}
              />
            </DialogContent>
            <DialogActions>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      createNewPost();
                      handleCloseCreatePostDialog();
                    }}
                    disabled={
                      !newPostTitle.trim() || !newPostDescription.trim()
                    }
                    style={{ marginTop: 16 }}
                  >
                    Create Post
                  </Button>
                </div>
              </div>
              <Button onClick={handleCloseCreatePostDialog} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Snackbar
          open={errorMessage !== ""}
          autoHideDuration={5000}
          onClose={closeErrorSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={closeErrorSnackbar} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default Forum;
