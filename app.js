const express = require("express");
const app = express();
const cors = require("cors");

const error = require("./controllers/error");
const ApppError = require("./utils/AppError");
const auth = require("./routes/auth");

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", auth);

app.all("*", (req, res, next) => {
  next(new ApppError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(error);
module.exports = app;
