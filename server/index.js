const express = require("express");
const app = express();
var cors = require("cors");
// const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/postRoutes");

const port = 8000;
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.get("/", function (req, res) {
  res.send("Hello JS");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
