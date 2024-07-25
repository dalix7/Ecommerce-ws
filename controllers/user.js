const User = require("../model/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Email should be unique try again!" }] });
    }
    const saltRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ ...req.body });
    newUser.password = hashedpassword;
    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).send({ msg: "register success", user: newUser, token });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "not register!" }] });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).send({ errors: [{ msg: "user not 4  found" }] });
    }

    const checkPassword = await bcrypt.compare(password, foundUser.password);
    if (!checkPassword) {
      return res
        .status(400)
        .send({ errors: [{ msg: "email or password not correct" }] });
    }
    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).send({ msg: "login sucess...", user: foundUser, token });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "can not  login to user!" }] });
  }
};
