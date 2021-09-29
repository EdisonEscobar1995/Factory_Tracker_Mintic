const express = require("express");
require('dotenv').config();
require("./config/db");
const cors = require('cors');

//importing route
const routesAuth = require('./api/routes/authRoutes');
const routesUser = require('./api/routes/userRoutes');

// create express app
const app = express();

app.use(cors());

// define port to run express app
const port = process.env.PORT || 5002;

// use bodyParser middleware on express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routesAuth(app);
routesUser(app);

// Add endpoint
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Listen to server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});