const Posts = require("../Models/Posts");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { verifyToken } = require("../verifyToken");
const { default: mongoose } = require("mongoose");

router.post("/dashboard", verifyToken, async (request, response) => {
  const newPost = new Posts({
    title: request.body.title,
    content: request.body.content,
    userid: request.body.userid,
  });

  try {
    const savedPost = newPost.save();
    response.status(200).json({
      message: "Posted Successfully!",
    });
  } catch (error) {
    response.status(500).json(error);
  }
});

router.get("/dashboard", verifyToken, async (request, response) => {
  try {
    const posts = await Posts.find({
      userid: mongoose.Types.ObjectId(request.body.userid),
    });
    if (posts) {
      response.status(200).json(posts);
    } else {
      response.json({ message: "No Post Found" });
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

router.delete("/dashboard/:postID", async (request, response) => {
  try {
    const posts = await Posts.findOneAndDelete({ _id: request.params.postID });
    if (posts) {
      response.status(200).json({ message: "Deleted Post" });
    } else {
      response.json({ message: "Something went wrong" });
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
