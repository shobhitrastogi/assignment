const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  // Define your order schema fields
});

module.exports = mongoose.model("Order", OrderSchema);
