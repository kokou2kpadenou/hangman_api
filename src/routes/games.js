const express = require("express");

const router = express.Router();

const {
  postGame,
  getCurrentGame,
  patchGuess,
  patchGameCancel,
  getGames,
  getGameById,
} = require("../controllers/games");

// Create a new game
router.post("/game", postGame);
// Get game by id
router.get("/game/by/:id", getGameById);
// Get current game
router.get("/game/current", getCurrentGame);
// Cancel game
router.patch("/game/cancel", patchGameCancel);
// guess
router.patch("/game/guess", patchGuess);
// Get all games
router.get("/games/:user?", getGames);

module.exports = router;
