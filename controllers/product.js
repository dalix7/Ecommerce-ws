const Product = require("../model/Product");
const cloudinary = require("../middleware/cloudinary");

exports.addProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const image = req.file ? req.file.path : "";
    const newProduct = new Product({
      title,
      description,
      price,
      image,
      id_user: req.user._id,
    });
    await newProduct.save();
    res.status(200).send({ msg: "Product add succ ..", newProduct });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Can not add Product !!", error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const ListProducts = await Product.find();
    res
      .status(200)
      .send({ msg: "this is the list of all product", ListProducts });
  } catch (error) {
    res.status(400).send({ msg: "can not get product", error });
  }
};
exports.getOneProduct = async (req, res) => {
  try {
    const productToGet = await Product.findOne({ _id: req.params.id });
    res.status(200).send({ msg: "i get the product", productToGet });
  } catch (error) {
    res.status(400).send({ msg: "can not get product with this 1 id" });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    const productToDelete = await Product.findOneAndDelete({
      _id,
    });
    res.status(200).send({ msg: "product deleted " });
  } catch (error) {
    res.status(400).send({ msg: "can not delete product with this id" });
  }
};
exports.editProduct = async (req, res) => {
  try {
    const { _id } = req.params;

    await Product.updateOne({ _id }, { $set: { ...req.body } });

    res.status(200).send({ msg: "Product updated.." });
  } catch (error) {
    res.status(400).send({ msg: "can not edit", error });
  }
};
