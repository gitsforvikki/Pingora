import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import authenticate from "../middleware/authenticate.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/",
  [
    body("text").notEmpty().withMessage("Text is required"),
    body("image").notEmpty().withMessage("Image is required"),
  ],
  authenticate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id);
      const newPost = {
        user: req.user.id,
        text: req.body.text,
        image: req.body.image,
        name: user.name,
        avatar: user.avatar,
      };
      const post = new Post(newPost);
      await post.save();
      res.status(200).json({
        msg: "Post created success.",
        post: post,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

//get all posts
router.get("/", authenticate, async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      return res.status(400).json({ error: [{ msg: "No any post found." }] });
    }
    res.status(200).json({ posts: posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

//get a post by postId
router.get("/:postId", authenticate, async (request, response) => {
  try {
    const postId = request.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      response.status(400).json({ errors: [{ msg: "Post not found." }] });
    }
    response.status(200).json({ post: post });
  } catch (error) {
    console.log(error);
    response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

// delete a post by postId
router.delete("/:postId", authenticate, async (request, response) => {
  try {
    const postId = request.params.postId;
    let post = await Post.findById(postId);
    if (!post) {
      response
        .status(400)
        .json({ errors: [{ msg: "No post found for delete" }] });
    }
    post = await Post.findByIdAndDelete(postId);
    response.status(200).json({
      msg: "Post delete successfully.",
      post: post,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ errors: [{ mes: error.message }] });
  }
});

//like a post
router.put("/likes/:postId", authenticate, async (request, response) => {
  try {
    const postId = request.params.postId;
    const user = request.user.id;
    const post = await Post.findById(postId);
    if (!post) {
      return response.status(400).json({ errors: [{ msg: "Post not found" }] });
    }
    //check is user already likes or not
    const isAlreadyLiked =
      post.likes.filter((like) => like.user.toString() === user).length > 0;
    if (isAlreadyLiked) {
      return response
        .status(400)
        .json({ errors: [{ msg: "Post already liked by you." }] });
    }
    post.likes.unshift({ user: user });
    post.save();
    response.status(200).json({ post: post });
  } catch (error) {
    console.log(error);
    response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

//dislike a post
router.put("/unlike/:postId", authenticate, async (request, response) => {
  try {
    const postId = request.params.postId;
    const userId = request.user.id;

    let post = await Post.findById(postId);
    if (!post) {
      return response.status(404).json({
        errors: [{ msg: "Post not found" }],
      });
    }

    const likeIndex = post.likes.findIndex(
      (like) => like.user.toString() === userId
    );

    if (likeIndex === -1) {
      return response.status(400).json({
        errors: [{ msg: "You have not liked this post, cannot unlike" }],
      });
    }

    // Remove the like
    post.likes.splice(likeIndex, 1);
    await post.save();

    return response.status(200).json({
      msg: "Post unliked successfully",
      post: post,
    });
  } catch (error) {
    console.error("Error in unlike route:", error);
    return response.status(500).json({
      errors: [{ msg: error.message }],
    });
  }
});

export default router;
