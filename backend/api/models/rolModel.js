'use strict';
// Import mongoose
const mongoose = require("mongoose");

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const RolSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    allowNull: false,
  },
  status: {
    type: Boolean,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

// create and export model
module.exports = mongoose.model("rolModel", RolSchema);