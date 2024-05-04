const { hashPassword, comparePassword } = require("../helper/userHelper");
const User = require("../models/userModel");
const JWT = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
  try {
    const { name, email, password, postalCode, address } = req.body;

    // validation
    if (!name || !email || !password || !postalCode || !address) {
      return res.send({ message: "All Field Required" });
    }

    // check if existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User Already Exists Please Login",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      postalCode,
      address,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Enter email or password",
      });
    }

    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid! email not found",
      });
    }

    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid! Password not match",
      });
    }

    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        postalCode: user.postalCode,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status().send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};
