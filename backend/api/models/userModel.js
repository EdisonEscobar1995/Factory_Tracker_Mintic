'use strict';
// Import mongoose
const mongoose = require("mongoose");

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    allowNull: false,
  },
  password: {
    type: String,
    required: true,
    allowNull: false,
  },
  status: {
    type: Boolean,
    required: true,
  },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rolModel'
  }],
  createdOn: {
    type: Date,
    default: Date.now
  }
});

// create and export model
module.exports = mongoose.model("userModels", UserSchema);