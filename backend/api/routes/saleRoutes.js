'use strict';

// create App function
module.exports = function (app) {
  const saleControl = require('../controllers/saleController');

  // userList Routes

  // get and post request for /users endpoints
  app
    .route("/sales")
    .get(saleControl.listAllSales)
    .post(saleControl.createNewSale);

  // put and delete request for /users endpoints
  app
    .route("/sale/:id")
    .put(saleControl.updateSale)
    .delete(saleControl.deleteSale);
};