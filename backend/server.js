const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("listening on port ", process.env.PORT);
});

const DB = process.env.MONGO_DB.replace("<PASSWORD>", process.env.MONGO_PASSWD);

mongoose.connect(DB).then((con) => {
  console.log("DB connection established");
});
