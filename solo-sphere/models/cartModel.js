const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  qty: {
    type: Number,
    default: 1,
  },

  ordered: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
