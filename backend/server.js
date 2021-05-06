// Public libraries
const express = require("express");
const mongoose = require("mongoose");
// Personal libraries
// Initialize app environment
const app = express();
// Elements from env
require("dotenv").config();
// Variables
const port = process.env.PORT || 5000;
const db = process.env.MONGOURI;
// Variables and links from files
const authRoutes = require("./routes/auth");
// MongoDb database
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
// Check if connected
mongoose.connection
  .on("error", (err) => {
    console.error(err);
  })
  .on("connected", (err) => {
    console.log(`DB connected on ${db}`);
  });
// Middlewares
// JSON Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// user Routes
app.use("/api", authRoutes);
// Listening port
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
