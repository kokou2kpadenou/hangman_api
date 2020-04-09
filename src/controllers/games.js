const Games = require("../models/games");
const Users = require("../models/users");

/**
 *
 *  Create a new game controller
 *
 */

exports.postGame = (req, res, next) => {
  //

  if (!req.body.gameOwner) {
    return res.status(400).json({ errmsg: "gameOwner is required in body." });
  }

  if (!req.body.gameWord) {
    return res.status(400).json({ errmsg: "gameWord is required in body." });
  }

  if (!req.body.numberOfGuesses) {
    return res
      .status(400)
      .json({ errmsg: "numberOfGuesses is required in body." });
  }

  Users.findOne({ user: req.body.gameOwner })
    .then((user) => {
      if (user) {
        // Add the initial game playboard to the game's parameters
        const newGameValue = {
          gameOwner: req.body.gameOwner,
          gameWord: req.body.gameWord.toUpperCase(),
          numberOfGuesses: req.body.numberOfGuesses,
          gamePlayboard: req.body.gameWord
            .replace(/\s+/g, "")
            .split("")
            .map((l) => ""),
        };

        const game = new Games(newGameValue);

        game
          .save()
          .then((newGame) => {
            if (!newGame || newGame.length === 0) {
              return res.status(500).json({ errmsg: "Internal server error." });
            }

            res.status(201).json(newGame);
          })
          .catch((err) =>
            res.status(500).json({ errmsg: "Internal server error" })
          );
      } else {
        res.status(404).json({
          errmsg: `Game Owner ${req.body.gameOwner} doesn't exist as user.`,
        });
      }
    })
    .catch((err) => res.status(500).json({ errmsg: "Internal server error." }));
};

/**
 *
 *  Get game by id controller
 *
 */

exports.getGameById = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ errmsg: "id parameter is missing." });
  }

  Games.findOne(
    { _id: req.params.id },
    "gameOwner gameWord gamePlayboard gameStatus numberOfGuesses winner guesses"
  )
    .then((game) => {
      if (game) {
        const returningGame = {
          ...game.toObject(),
          gameWord:
            game.gameStatus === "game over" || game.gameStatus === "canceled"
              ? game.gameWord
              : "",
        };
        res.status(200).json(returningGame);
      } else {
        res
          .status(404)
          .json({ errmsg: `Game with id: ${req.params.id} does not exist.` });
      }
    })
    .catch((err) => res.status(500).json({ errmsg: "Internal server error" }));
};

/**
 *
 *  Get current game controller
 *
 */

exports.getCurrentGame = (req, res, next) => {
  Games.findOne(
    { gameStatus: "active" },
    "gameOwner gameWord gamePlayboard gameStatus numberOfGuesses winner guesses"
  )
    .sort({ gameDate: 1 })
    .limit(1)
    .then((game) => {
      if (game) {
        const returningGame = {
          ...game.toObject(),
          gameWord:
            game.gameStatus === "game over" || game.gameStatus === "canceled"
              ? game.gameWord
              : "",
        };
        res.status(200).json(returningGame);
      } else {
        res.status(200).json({});
      }
    })
    .catch((err) => res.status(500).json({ errmsg: "Internal server error" }));
};

/**
 *
 *  Guessing controller
 *
 */

exports.patchGuess = (req, res, next) => {
  //
  // body = { gameID: "", guessLetter: "L", guessingPlayer: "dsds" };
  if (!req.body.gameID) {
    res.status(400).json({ errmsg: "gameID is required in body" });
  }

  if (!req.body.guessLetter) {
    res.status(400).json({ errmsg: "guessingLetter is required in body" });
  }

  if (!req.body.guessingPlayer) {
    res.status(400).json({ errmsg: "guessingPlayer is required in body" });
  }

  const playingGame = () => {
    Games.findOne({ _id: req.body.gameID })
      .then((game) => {
        if (game) {
          if (game.gameStatus === "canceled") {
            return res.status(410).json({
              errmsg: `game with ${req.body.gameID}, has been canceled`,
            });
          }

          if (game.gameStatus === "game over") {
            return res
              .status(410)
              .json({ errmsg: `game with ${req.body.gameID}, is over` });
          }

          if (game.gameOwner === req.body.guessingPlayer) {
            return res
              .status(410)
              .json({ errmsg: `user can't play is owner game` });
          }

          // Check if the letter is already played

          if (
            game.guesses
              .map((g) => g.letterGuessed)
              .includes(req.body.guessLetter)
          ) {
            return res.status(410).json({
              errmsg: `${req.body.guessLetter} was proposed by another user.`,
            });
          }

          // Playing
          const newGamePlayboard = [...game.gamePlayboard];
          game.gameWord
            .replace(/\s+/g, "")
            .split("")
            .forEach((l, i) => {
              if (l === req.body.guessLetter) {
                newGamePlayboard[i] = l;
              }
            });
          let winner = "",
            gameStatus = game.gameStatus;
          // the new game playbord is all filled and guessed letter is on the board
          if (
            !newGamePlayboard.includes("") &&
            newGamePlayboard.includes(req.body.guessLetter)
          ) {
            gameStatus = "game over";
            winner = req.body.guessingPlayer;
          }

          // the new game playboard has not filled spot and number of guesses is reached

          if (
            newGamePlayboard.includes("") &&
            !newGamePlayboard.includes(req.body.guessLetter) &&
            game.guesses.filter((g) => g.guessingCorrect === false).length +
              1 >=
              game.numberOfGuesses
          ) {
            gameStatus = "game over";
            winner = game.gameOwner;
          }

          const guessData = {
            letterGuessed: req.body.guessLetter,
            guessingPlayer: req.body.guessingPlayer,
            guessingCorrect: newGamePlayboard.includes(req.body.guessLetter),
          };

          Games.findOneAndUpdate(
            { _id: req.body.gameID },
            {
              $set: {
                gamePlayboard: newGamePlayboard,
                gameStatus: gameStatus,
                winner: winner,
              },
              $push: { guesses: guessData },
            },
            {
              new: true,
              fields:
                "gameOwner gameWord gamePlayboard gameStatus numberOfGuesses winner guesses",
            }
          )
            .then((gameUpdated) => {
              if (gameUpdated) {
                //
                // Update user score
                if (gameStatus === "game over") {
                  Users.findOneAndUpdate(
                    { user: winner },
                    { $inc: { score: 1 } }
                  ).catch((err) =>
                    res.status(500).json({ errmsg: "Internal server error" })
                  );
                }

                //
                const returningGame = {
                  ...gameUpdated.toObject(),
                  gameWord:
                    gameUpdated.gameStatus === "game over" ||
                    gameUpdated.gameStatus === "canceled"
                      ? gameUpdated.gameWord
                      : "",
                };
                res.status(200).json(returningGame);
              } else {
                res.status(500).json({ errmsg: "Internal server error" });
              }
            })
            .catch((err) =>
              res.status(500).json({ errmsg: "Internal server error" })
            );

          //
        } else {
          res
            .status(404)
            .json({ errmsg: `game with ${req.body.gameID}, does not exist` });
        }
      })
      .catch((err) => {
        res.status(500).json({ errmsg: "Internal server error" });
      });
  };

  Users.findOne({ user: req.body.guessingPlayer })
    .then((user) => {
      if (user) {
        playingGame();
      } else {
        res.status(404).json({ errmsg: "user does not exist" });
      }
    })
    .catch((err) => res.status(500).json({ errmsg: "Internal server error" }));
};

/**
 *
 *  Cancel a game controller
 *
 */

exports.patchGameCancel = (req, res, next) => {
  if (!req.body.gameID) {
    res.status(400).json({ errmsg: "gameID is required in body" });
  }
  if (!req.body.user) {
    res.status(400).json({ errmsg: "user is required in body" });
  }

  Games.findOneAndUpdate(
    {
      _id: req.body.gameID,
      gameOwner: req.body.user,
      gameStatus: "active",
    },
    { gameStatus: "canceled" },
    { new: true }
  )
    .then((game) => {
      if (game) {
        res.status(200).json(game);
      } else {
        Games.findOne({ _id: req.body.gameID })
          .then((_game) => {
            if (_game) {
              // user not owner
              if (_game.gameOwner !== req.body.user) {
                res.status(422).json({
                  errmsg: `gameID: ${req.body.gameID} is not for ${req.body.user}.`,
                });
                return;
              }

              // already canceled
              if (_game.gameStatus === "canceled") {
                res.status(410).json({
                  errmsg: `gameID: ${req.body.gameID} is already canceled.`,
                });
                return;
              }

              // the game is over
              if (_game.gameStatus === "game over") {
                res.status(410).json({
                  errmsg: `gameID: ${req.body.gameID} is over.`,
                });
                return;
              }
            } else {
              res.status(404).json({
                errmsg: `gameID: ${req.body.gameID} do not exist.`,
              });
            }
          })
          .catch((err) =>
            res.status(500).json({ errmsg: "Internal server error" })
          );
      }
    })
    .catch((err) => res.status(500).json({ errmsg: "Internal server error" }));
};

/**
 *
 *  Get all games controller
 *
 */

exports.getGames = (req, res, next) => {
  Games.find({})
    .then((games) => {
      if (games) {
        const gamesToUser = games.map((game) => ({
          ...game.toObject(),
          gameWord:
            game.gameStatus === "active" && game.gameOwner !== req.params.user
              ? ""
              : game.gameWord,
        }));

        res.status(200).json(gamesToUser);
      } else {
        res.status(200).json({});
      }
    })
    .catch((err) => res.status(500).json({ errmsg: "Internal server error" }));
};
