const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true,
  },
  fileSize: {
    type: String,
    required: true,
  },
  close: {
    type: Boolean,
    required: true,
  },
  tag: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    tagTitle: {
      type: String,
      required: true,
    },
    tagColor: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", taskSchema);
