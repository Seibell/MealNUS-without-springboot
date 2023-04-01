import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar.js";
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
} from "@material-ui/core";

import { ThumbUp, ThumbDown } from "@material-ui/icons";
const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");
  const [filter, setFilter] = React.useState("");

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
    };

    await axios.post(
      "http://localhost:8080/MealNUS-war/rest/Forum/createNewForumPost",
      postData
    );
    fetchPosts();
    setNewPostTitle("");
    setNewPostDescription("");
  };

  const handleThumbUp = async (postId) => {
    // await axios.put(
    //   `http://localhost:8080/MealNUS-war/rest/Forum/thumbsUpForumPost/${postId}`
    // );
    fetchPosts();
  };

  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <Container>
      <NavBar />
      <Typography variant="h4" gutterBottom>
        Forum
      </Typography>
      <FormControl style={{ marginTop: 15, marginBottom: 35 }}>
        <InputLabel id="filter-select-label" style={{}}>
          Filter By
        </InputLabel>
        <Select
          labelId="filter-select-label"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="popularity">Popularity(Desc)</MenuItem>
          <MenuItem value="time">Time(Desc)</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        <Grid
          container
          spacing={2}
          style={{ height: "70vh", overflow: "auto" }}
        >
          {posts.forumPostEntities &&
            posts.forumPostEntities.map((post) => (
              <Grid item xs={12} key={post.postId}>
                <Paper elevation={2} style={{ padding: 16, width: "90vw" }}>
                  <Typography variant="h5">
                    <strong>{post.postTitle}</strong>
                  </Typography>
                  <Typography variant="body1">
                    {post.postDescription}
                  </Typography>
                  <div style={{ display: "flex", marginTop: 16 }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <IconButton
                        aria-label="thumbs up"
                        onClick={() => handleThumbUp(post.postId)}
                      >
                        <ThumbUp />
                      </IconButton>
                      <Typography>{post.numThumbsUp}</Typography>
                    </div>
                    <Typography style={{ marginLeft: "auto" }}>
                      {new Date(
                        post.postDate.replace("[UTC]", "")
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Typography>
                  </div>
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
          {errorMessage !== "" && (
            <Typography variant="body2" style={{ color: "red", marginTop: 16 }}>
              {errorMessage}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Forum;
