// import User Model
const Sale = require("../models/saleModel");
const User = require("../models/userModel");

// DEFINE CONTROLLER FUNCTIONS

// listAllSales function - To list all Sales
exports.listAllSales = (req, res) => {
  Sale.find({}, (err, sales) => {
    if (err) {
      res.status(500).send(err);
    }
    console.log(sales);
    // User.populate(sales, { path: "user" }, function (err, sales) {
    res.status(200).json(sales);
    //});
  });
};

// createNewSale function - To create new sale
exports.createNewSale = (req, res) => {
  console.log('req.body == ', req.body);
  const { product, description, price, user } = req.body;
  const newSale = new Sale({ product, description, price, user });
  console.log('newSale == ', newSale);
  newSale.save((err, sale) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(sale);
  });
};

// updateSale function - To update sale status by id
exports.updateSale = (req, res) => {
  Sale.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(todo);
  });
};

// deleteSale function - To delete sale by id
exports.deleteSale = async (req, res) => {
  await Sale.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.status(200).json({ message: "Venta eliminada satisfactoriamente" });
  });
};