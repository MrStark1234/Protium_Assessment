const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("Connected to Chits Database"));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  // chits: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Post",
  //   },
  // ],
});

module.exports = mongoose.model("User", userSchema);
