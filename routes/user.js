const express = require("express");
const { register, login } = require("../controllers/user");
const {
  registerValidation,
  Validation,
  loginValidation,
} = require("../middleware/validator");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.post("/register", registerValidation(), Validation, register);
router.post("/login", loginValidation(), Validation, login);
router.get("/current", isAuth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
