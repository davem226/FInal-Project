const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
// const sequelize = require("sequelize");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Add routes, both API and view
app.use(routes);

// Connect to the MySQL DB
// sequelize.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

// Start the API server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});