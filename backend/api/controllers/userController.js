// import User Model
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// DEFINE CONTROLLER FUNCTIONS

// listAllUsers function - To list all todos
exports.listAllUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

// createNewUser function - To create new user
exports.createNewUser = (req, res) => {
  console.log('req.body == ', req.body);
  const { email, password, status } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    const newUser = new User({ email, password: hash, status });
    console.log('newUser == ', newUser);
    newUser.save((err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(user);
    });
  });
};

// updateUser function - To update user status by id
exports.updateUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(todo);
  });
};

// deleteUser function - To delete user by id
exports.deleteUser = async (req, res) => {
  await User.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.status(200).json({ message: "User successfully deleted" });
  });
};