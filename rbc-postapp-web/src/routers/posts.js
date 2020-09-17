const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const User = require('../models/user');
const auth = require('../middleware/auth');

//Create a post
router.post('/createPost', auth, async (req, res) => {
  console.log(req.body);
  const post = new Post({
    ...req.body,
    owner: req.user._id,
    ownerEmail: req.user.email,
  });
  try {
    await post.save();
    res.status(201).send('Post Created Successfully');
  } catch (error) {
    res.status(400).send(error);
  }
});

//Fetch All the Posts Auth is not required
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetch posts for the loggedin user
router.get('/posts', auth, async (req, res) => {
  try {
    const postsForLoggedInUser = await Post.find({ owner: req.user._id });

    if (!postsForLoggedInUser) res.status(404).send();

    res.status(200).send(postsForLoggedInUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetch particular post Auth is not required
router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (!post) res.status(404).send();

    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete a post
router.delete('/posts/:id', auth, async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!deletedPost) res.status(404).send();

    res.send(deletedPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
