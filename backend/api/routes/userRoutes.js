'use strict';

// create App function
module.exports = function (app) {
  const userList = require('../controllers/userController');

  // userList Routes

  // get and post request for /users endpoints
  app
    .route("/users")
    .get(userList.listAllUsers)
    .post(userList.createNewUser);

  // put and delete request for /users endpoints
  app
    .route("/user/:id")
    .put(userList.updateUser)
    .delete(userList.deleteUser);
};