const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
  gameOwner: { type: String, required: true, dropDups: true },
  gameWord: { type: String, required: true, dropDups: true },
  gamePlayboard: [],
  gameDate: { type: Date, default: Date.now },
  gameStatus: { type: String, default: "active" }, // 'active', 'game over', 'canceled'
  numberOfGuesses: Number,
  winner: { type: String, default: "" },
  guesses: [
    {
      _id: { type: Schema.Types.ObjectId, auto: true },
      letterGuessed: String,
      guessingPlayer: String,
      guessingCorrect: Boolean,
    },
  ],
});

module.exports = mongoose.model("Games", gamesSchema);
