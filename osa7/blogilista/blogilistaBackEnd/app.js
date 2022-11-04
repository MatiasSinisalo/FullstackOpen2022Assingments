const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const tokenExtractor = require("./utils/tokenExtractor");
const userExtractor = require("./utils/userExtractor");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const mongoose = require("mongoose");

const mongoUrl = mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use(userExtractor);

if (process.env.NODE_ENV === "test") {
  console.log("TESTING API ROUTE ENABLED");
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
module.exports = app;
