const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// add to cart
router.post("/cart", cartController.addToCart);

// show Cart items
router.get("/getcart/:userId", cartController.getCartItems);

module.exports = router;
