'use strict';
// Import mongoose
const mongoose = require("mongoose");

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const SaleSchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel',
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

// create and export model
module.exports = mongoose.model("ventaModels", SaleSchema);