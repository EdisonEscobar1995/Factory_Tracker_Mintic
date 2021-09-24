// require express and bodyParser
const express = require("express");
// Import DB Connection

// Import API route
require("./config/db");
var routes = require('./api/routes/userRoutes'); //importing route

// create express app
const app = express();

// define port to run express app
const port = process.env.PORT || 3000;

// use bodyParser middleware on express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

// Add endpoint
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Listen to server
app.listen(port, () => {

  console.log(`Server running at http://localhost:${port}`);
});