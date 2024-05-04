const itemModel = require("../models/itemModel");
const fs = require("fs");

module.exports.addItem = async (req, res) => {
  try {
    const { name, price } = req.fields;
    const { photo } = req.files;
    // validation
    if (!name || !price) {
      return res.status(404).send({
        success: false,
        message: "All Field Required",
      });
    }
    if (photo && photo.size > 1000000) {
      return res.status(404).send({
        success: false,
        message: "Image too large",
      });
    }
    const products = new itemModel({ name, price });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Product",
      error,
    });
  }
};
// Show all items
module.exports.showItems = async (req, res) => {
  try {
    const products = await itemModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      Total: products.length,
      message: "All Product List",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Product",
      error,
    });
  }
};

// get photo
module.exports.getPhoto = async (req, res) => {
  try {
    const product = await itemModel.findById(req.params.pId).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Photo",
      error,
    });
  }
};
