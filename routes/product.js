const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const isAuth = require("../middleware/isAuth");

const {
  addProduct,
  getProducts,

  deleteProduct,
  getOneProduct,
  editProduct,
} = require("../controllers/product");

router.get("/test", (req, res) => {
  res.send("hello product");
});

router.post("/add", isAuth, upload.single("image"), addProduct);
router.get("/getall", getProducts);
router.get("/:id", getOneProduct);
router.delete("/:_id", deleteProduct);
router.put("/:_id", editProduct);

module.exports = router;
