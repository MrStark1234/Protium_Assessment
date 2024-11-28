// fetchuser.js

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  //---------GET THE USER FROM THE JWT TOKEN AND ADD ID TO THE REQUEST OBJECT---------
  const token = req.header("token");
  if (!token) {
    res
      .status(401)
      .send({ error: "Please authenticate using the valid token " });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ error: "Please authenticate using the valid token " });
  }
};

module.exports = fetchuser;
