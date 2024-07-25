const jwt = require("jsonwebtoken");
const User = require("../model/User");

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .send({ errors: [{ msg: "Not authorized (missing token)!" }] });
    }
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).send({
        errors: [{ msg: "Not authorized (token missing after Bearer)!" }],
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // [id]
    const foundUser = await User.findOne({ _id: decoded.id });
    if (!foundUser) {
      return res
        .status(401)
        .send({ errors: ["Not authorized (user not found)!"] });
    }
    req.user = foundUser;
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Debugging line
    return res.status(401).send({
      errors: [{ msg: "Not authorized (token verification failed)!" }],
    });
  }
};
module.exports = isAuth;
