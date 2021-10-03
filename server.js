const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const serverStart = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    await app.listen(PORT, () => {
      console.log(`App running on port ${PORT}!`);
    });
  }
  catch (err) {
    console.log(err);
  }
}


// routes
app.use(require("./routes/api.js"));

serverStart();
