const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Types.ObjectId,
  },
});

module.exports = mongoose.model("Posts", postSchema);
