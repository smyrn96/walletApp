const app = require("./app");
const dns = require("node:dns/promises");
const mongoose = require("mongoose");
dns.setServers(["1.1.1.1"]);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("listening on port ", process.env.PORT);
});

const DB = process.env.MONGO_DB.replace("<PASSWORD>", process.env.MONGO_PASSWD);

mongoose.connect(DB).then((con) => {
  console.log("DB connection established");
});
