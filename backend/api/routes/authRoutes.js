'use strict';

module.exports = function (app) {
  const auth = require('../controllers/authController');

  // get and post request for /users endpoints
  app
    .route("/login")
    .post(auth.login);

};