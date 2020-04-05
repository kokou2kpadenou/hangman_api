const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
  gameOwner: { type: String, required: true, dropDups: true },
  gameWord: { type: String, required: true, dropDups: true },
  gamePlayboard: [],
  gameDate: { type: Date, default: Date.now },
  gameStatus: { type: String, default: "active" }, // 'active', 'game over', 'canceled'
  numberOfGuesses: Number,
  guesses: [
    {
      _id: Schema.Types.ObjectId,
      letterGuessed: String,
      guessingPlayer: String,
      guessingCorrect: Boolean,
    },
  ],
});

module.exports = mongoose.model("Games", gamesSchema);
