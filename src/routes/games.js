const express = require("express");

const router = express.Router();

const {
  postGame,
  getCurrentGame,
  postGuess,
  patchGameCancel,
  getGames,
  getGameById,
} = require("../controllers/games");

// Create a new game
router.post("/game", postGame);
// Get game by id
router.get("/game/by/:id", getGameById);
// Get current game
router.get("/game/current/:user", getCurrentGame);
// Cancel game
router.patch("/game/cancel/:user.:gameID", patchGameCancel);
// guess
router.post("/game/guess", postGuess);
// Get all games
router.get("/games/:user", getGames);

module.exports = router;
