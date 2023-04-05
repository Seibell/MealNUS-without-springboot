import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import NavBar from "../Navigation/NavBar.js";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {
  Container,
  Grid,
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

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get(
      "http://localhost:8080/MealNUS-war/rest/Forum/retrieveAllForumPosts"
    );
    setPosts(response.data);
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

  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const handleClickOpen = () => {
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
      <NavBar />
      <Container>
        <Typography variant="h4" gutterBottom>
          Forum
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="filter-select-label">Filter By</InputLabel>
          <Select
            labelId="filter-select-label"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="time">Latest Posts</MenuItem>
            <MenuItem value="popularityUp">ThumbUp: High to Low</MenuItem>
            <MenuItem value="popularityDown">ThumbDown: High to Low</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={3}>
          <Grid
            container
            spacing={2}
            style={{ height: "70vh", overflow: "auto" }}
          >
            {posts.forumPostEntities &&
              [...posts.forumPostEntities]
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
                              handleThumbUp(post.postId, post.user.userId)
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
                              handleThumbDown(post.postId, post.user.userId)
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
                        onClick={handleClickOpen}
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
                    >
                      <DialogTitle id="form-dialog-title">
                        View Reply
                      </DialogTitle>
                      <DialogContent>
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
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary">
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                ))}
          </Grid>
          {/* //add this line onwards about the codes for the second part */}
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
