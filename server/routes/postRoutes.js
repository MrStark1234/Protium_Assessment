const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Post = require("../models/chits");
const User = require("../models/user");

// Middleware to authenticate routes
router.use(fetchuser);

// Create a new post
router.post("/create", async (req, res) => {
  try {
    const { desc, fileSize, close, tag } = req.body;

    const newPost = await Post.create({
      desc,
      fileSize,
      close,
      tag,
      user: req.user.id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all posts
router.get("/getAllPosts", async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a post by ID
router.put("/updatePost/:id", async (req, res) => {
  try {
    // Extract fields to update from the request body
    const { desc, fileSize, close, tag } = req.body;

    // Find the post by ID and ensure it belongs to the authenticated user
    const post = await Post.findOne({ _id: req.params.id, user: req.user.id });

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found or not authorized" });
    }

    // Update the fields
    post.desc = desc ?? post.desc; // Use existing value if no new value is provided
    post.fileSize = fileSize ?? post.fileSize;
    post.close = close ?? post.close;
    post.tag = tag ?? post.tag;

    // Save the updated post
    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete post by ID
router.delete("/deletePost/:id", async (req, res) => {
  try {
    let postId = await Post.findById(req.params.id);

    if (!postId) {
      return res.status(404).json({ message: "Post not found" });
    }

    postId = await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
