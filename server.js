const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB connected");
  })
  .catch((e) => {
    console.log(e, "wow");
  });

app.listen(8000, () => {
  console.log("server is running!");
});
