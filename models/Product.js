const mongoose = require("mongoose")
const {Schema} = mongoose
 const ProductSchema = new Schema ({
    title: String,
  price: Number,
  description: String,
  availability: Boolean,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
 })
 module.exports =mongoose.model("Product",ProductSchema)