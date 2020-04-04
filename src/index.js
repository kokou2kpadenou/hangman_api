const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const infoRoutes = require("./routes/info");
const usersRoutes = require("./routes/users");
const gamesRoutes = require("./routes/games");

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/hangman";

app.use(bodyParser.json());

app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}, ${req.body}`);
  next();
});

app.use(cors());

app.use("/hangman", infoRoutes);
app.use("/hangman", usersRoutes);
app.use("/hangman", gamesRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "../public/404.html"));
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).sendFile(path.join(__dirname, "../public/500.html"));
});

mongoose
  .connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Hangman's Server has started on ${PORT}`)
    )
  )
  .catch(error => console.log(error));
