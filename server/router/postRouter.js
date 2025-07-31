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

export default router;
