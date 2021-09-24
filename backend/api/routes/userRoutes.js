'use strict';

// create App function
module.exports = function (app) {
  var todoList = require('../controllers/userController');

  // todoList Routes

  // get and post request for /users endpoints
  app
    .route("/users")
    .get(todoList.listAllTodos)
    .post(todoList.createNewTodo);

  // put and delete request for /users endpoints
  app
    .route("/user/:id")
    .put(todoList.updateTodo)
    .delete(todoList.deleteTodo);
};