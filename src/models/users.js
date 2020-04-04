const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  user: { type: String, required: true, unique: true, dropDups: true },
  score: { type: Number, default: 0 }
});

module.exports = mongoose.model("Users", usersSchema);
