require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const cartRoute = require("./routes/cartRoute");
const itemRoute = require("./routes/itemRoute");
const bodyParse = require("body-parser");

// db connection
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(bodyParse.json());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use(userRoute);
app.use(cartRoute);
app.use(itemRoute);

app.listen(PORT, () => {
  console.log(`Server Listening on http://localhost:${PORT}`);
});
