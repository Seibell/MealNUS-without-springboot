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
  },
  userImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: theme.spacing(1),
  },
  userContainer: {
    display: "flex",
    alignItems: "center",
  },
  thumbContainer: {
    display: "flex",
    alignItems: "center",
  },
  thumbIcon: {
    fontSize: "25px",
  },
  thumbCount: {
    marginLeft: theme.spacing(1),
  },
  time: {
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
                  </Grid>
                ))}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Create New Post
            </Typography>
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
            <Button
              variant="contained"
              color="primary"
              onClick={createNewPost}
              style={{ marginTop: 16 }}
            >
              Create Post
            </Button>
            {/* {errorMessage !== "" && (
              <Typography
                variant="body2"
                style={{ color: "red", marginTop: 16 }}
              >
                {errorMessage}
              </Typography>
            )} */}
          </Grid>
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
