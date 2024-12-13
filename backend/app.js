const express = require("express");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");

//Setting the env file
dotenv.config({ path: "./config.env" });

//Parsing jsons in server
app.use(express.json({ limit: "10kb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Routing
app.use("/api/v1/users/", userRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`There in no page with that URL(${req.originalUrl})`, 404));
});

module.exports = app;
