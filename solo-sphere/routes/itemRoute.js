const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();
const itemController = require("../controllers/itemController");

// add item into database
router.post("/addItem", formidable(), itemController.addItem);

// Retrieve all items from the database
router.get("/items", itemController.showItems);

router.get("/product-photo/:pId", itemController.getPhoto);

module.exports = router;
