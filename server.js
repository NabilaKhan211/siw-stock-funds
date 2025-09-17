const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

// Connect to the database

connectDB();

// Initiate express app

const app = express();

const port = process.env.PORT || 7000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// cashier
app.use("/stock-funds", userRoutes);



// Starting the server

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
