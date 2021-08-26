require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");

const port = process.env.PORT || 3001;
//API security
const cors = require("cors");

const bodyparser = require("body-parser");

//mongoDB connection setup
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/crm-ticket-system", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

if (process.env.NODE_ENV !== "production") {
  const mDB = mongoose.connection;
  mDB.on("open", () => {
    console.log("mongo is open");
  });
  mDB.on("error", (error) => {
    console.log(error);
  });
  app.use(morgan("tiny"));
}

const errorHandler = require("./src/router/utils/errorHandler");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const userRouter = require("./src/router/user.router");
const ticketRouter = require("./src/router/ticket.router");

// app.use(helmet());
app.use(cors());

app.use("/v1/user", userRouter);
app.use("/v1/ticket", ticketRouter);
app.use((req, res, next) => {
  const error = new Error("Resource not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  errorHandler(error, res);
});

app.listen(port, () => {
  console.log(`API is runing on http://localhost:${port}`);
});
