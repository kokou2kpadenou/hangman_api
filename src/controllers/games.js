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
    return res.status(400).json({ errmsg: "Game Owner is missing." });
  }

  if (!req.body.gameWord) {
    return res.status(400).json({ errmsg: "Game word is missing." });
  }

  if (!req.body.numberOfGuesses) {
    return res.status(400).json({ errmsg: "Number of guesses is missing." });
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
              return res.status(500).json({ errmsg: "Can create user." });
            }

            res.status(201).json(newGame);
          })
          .catch((err) => res.status(500).json(err));
      } else {
        res
          .status(422)
          .json(`Game Owner ${req.body.gameOwner} doesn't exist as user.`);
      }
    })
    .catch((err) => res.status(500).json(err));
};

/**
 *
 *  Get game by id controller
 *
 */

exports.getGameById = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json("Id parameter is missing.");
  }

  Games.findOne(
    { _id: req.params.id },
    "gameOwner gamePlayboard numberOfGuesses guesses"
  )
    .then((game) => {
      console.log(game);

      if (game) {
        res.status(200).json(game);
      } else {
        res
          .status(410)
          .json({ errmsg: `Game with id: ${req.params.id} does not exist.` });
      }
    })
    .catch((err) => res.status(500).json(err));
};

/**
 *
 *  Get current game controller
 *
 */

exports.getCurrentGame = (req, res, next) => {
  if (!req.params.user) {
    return res.status(400).json("User parameter is missing.");
  }

  Games.findOne(
    { gameStatus: "active" },
    "gameOwner gamePlayboard numberOfGuesses guesses"
  )
    .sort({ gameDate: 1 })
    .limit(1)
    .then((game) => {
      if (game) {
        res.status(200).json(game);
      } else {
        res.status(410).json({ errmsg: "no current game" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

/**
 *
 *
 */

exports.postGuess = (req, res, next) => {
  //
  // obj = { gameId: "", guessLetter: "L", guessingPlayer: "dsds" };
  if (!req.body.gameId) {
    res.status(400).json("game id is missing");
  }

  if (!req.body.guessLetter) {
    res.status(400).json("Guessing letter is missing");
  }

  if (!req.body.guessingPlayer) {
    res.status(400).json("guessing player is missing");
  }

  Games.findOne({ _id: req.body.gameId }, (err, game) => {
    if (err) {
      res.status(500).json(err);
    }

    if (!game) {
      res.status(400).json(`game with ${req.body.gameId}, does not exist`);
    }

    if (game.gameStatus === "canceled") {
      res.status(400).json(`game with ${req.body.gameId}, has been canceled`);
    }

    if (game.gameStatus === "game over") {
      // send current games
      res.status(400).json(`user can't play is owner game`);
    }

    if (game.gameOwner === req.body.guessingPlayer) {
      res.status(400).json(`game with ${req.body.gameId}, is over`);
    }

    if (
      game.guesses.map((g) => g.letterGuessed).includes([req.boby.guessLetter])
    ) {
      res.status(400).json(`${req.boby.guessLetter} has been proposed.`);
    }

    if (!game.gameWord.includes(req.boby.guessLetter)) {
      // Check if there is a unresolved games
      //
    }

    const newGamePlayboard = [...game.gamePlayboard];
    game.gameWord.forEach((l, i) => {
      if (l === req.body.guessLetter) {
        newGamePlayboard[i] = l;
      }
    });

    if (newGamePlayboard.includes([""])) {
      // The game is not over
    }

    // the game is over
    //
  });
};

/**
 *
 *  Cancel a game controller
 *
 */

exports.patchGameCancel = (req, res, next) => {
  if (!req.params.gameID) {
    res.status(400).json({ errmsg: "Game Id parameter is missing" });
  }
  if (!req.params.user) {
    res.status(400).json({ errmsg: "User parameter is missing" });
  }

  Games.findOneAndUpdate(
    {
      _id: req.params.gameID,
      gameOwner: req.params.user,
      gameStatus: "active",
    },
    { gameStatus: "canceled" },
    { new: true }
  )
    .then((game) => {
      if (game) {
        res.status(200).json(game);
      } else {
        Games.findOne({ _id: req.params.gameID })
          .then((_game) => {
            if (_game.gameOwner !== req.params.user) {
              res.status(400).json({
                errmsg: `game id: ${req.params.gameID} is not belong to ${req.params.user}.`,
              });
              return;
            }
            if (_game) {
              if (_game.gameStatus === "canceled") {
                res.status(400).json({
                  errmsg: `game id: ${req.params.gameID} is already canceled.`,
                });
                return;
              }
              if (_game.gameStatus === "game over") {
                res.status(400).json({
                  errmsg: `game id: ${req.params.gameID} is over.`,
                });
                return;
              }
            } else {
              res.status(400).json({
                errmsg: `game id: ${req.params.gameID} do not exist.`,
              });
            }
          })
          .catch((err) => res.status(500).json(err));
      }
    })
    .catch((err) => res.status(500).json(err));
};

/**
 *
 *  Get all games controller
 *
 */

exports.getGames = (req, res, next) => {
  if (!req.params.user) {
    res.status(400).json("User paramater is missing.");
  }

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
        res.status(200).json(games);
      }
    })
    .catch((err) => res.status(500).json(err));
};
