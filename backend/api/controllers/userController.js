// import User Model
const User = require("../models/userModel");

// DEFINE CONTROLLER FUNCTIONS

// listAllTodos function - To list all todos
exports.listAllTodos = (req, res) => {
  User.find({}, (err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(todo);
  });
};

// createNewTodo function - To create new todo
exports.createNewTodo = (req, res) => {
  console.log('req.body == ', req.body);
  let newTodo = new User(req.body);
  console.log('newTodo == ', newTodo);
  newTodo.save((err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(todo);
  });
};

// updateTodo function - To update todo status by id
exports.updateTodo = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(todo);
  });
};

// deleteTodo function - To delete todo by id
exports.deleteTodo = async (req, res) => {
  await User.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.status(200).json({ message: "User successfully deleted" });
  });
};