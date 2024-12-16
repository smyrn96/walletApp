const express = require("express");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const investmentRouter = require("./routes/investmentRoutes");
const roundUpRouter = require("./routes/roundUpRoutes");
const { errorController } = require("./controllers/errorController");
const AppError = require("./utils/appError");

//Setting the env file
dotenv.config({ path: "./config.env" });

//Parsing jsons in server
app.use(express.json({ limit: "10kb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Routing
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/transactions/", transactionRouter);
app.use("/api/v1/investments/", investmentRouter);
app.use("/api/v1/roundups/", roundUpRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`There in no page with that URL(${req.originalUrl})`, 404));
});

//General error handling
app.use(errorController);

module.exports = app;
