const Cart = require("../models/cartModel");
const mongoose = require("mongoose");

module.exports.addToCart = async (req, res) => {
  try {
    // get user id here
    const userId = new mongoose.Types.ObjectId(req.params.userId);

    const { itemId, qty } = req.body;
    const cartItem = new Cart({
      userId,
      itemId,
      qty,
      //   ordered is false by default
    });
    const result = await cartItem.save();
    res.status(201).send({
      success: true,
      message: "Item Added to Cart",
      cartItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Adding to cart",
    });
  }
};

module.exports.getCartItems = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID format" });
    }

    const cartItems = await Cart.find({ userId });
    res.status(200).json({ success: true, cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching cart items" });
  }
};
