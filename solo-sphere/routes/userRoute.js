const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// routing
// register post
router.post("/signup", userController.signup);

// login post
router.post("/login", userController.login);

module.exports = router;
