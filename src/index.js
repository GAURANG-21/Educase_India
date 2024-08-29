const express = require("express");
const bodyParser = require("body-parser");
const { connectDB, disconnectDB } = require("./config/connectionDB.js");
const env = require("./config/configServer.js");
const router = require("./routes/index.js");
const rateLimit = require("express-rate-limit");

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/", router);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

app.use(limiter);

app.listen(env.PORT, () => {
  console.log(`Server is running on PORT ${env.PORT}`);
  if (process.env.DB_SYNC) db.sequelize.sync({ alter: true });
});

process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit(0);
});
