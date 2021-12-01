const express = require("express");
const app = express();
const cors = require("cors");

const error = require("./controllers/error");
const ApppError = require("./utils/AppError");
const auth = require("./routes/auth");
const user = require("./routes/user");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);

app.all("*", (req, res, next) => {
  next(new ApppError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(error);
module.exports = app;
