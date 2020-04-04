const Users = require("../models/users");

/**
 *
 *  create user controller
 *
 */

exports.postUser = (req, res, next) => {
  if (!req.body.user) {
    return res.status(400).json({ errmsg: "user is required." });
  }

  Users.findOne({ user: req.body.user })
    .then(user => {
      if (!user || user.length === 0) {
        const user = new Users(req.body);

        user
          .save()
          .then(newUser => {
            if (!newUser || newUser.length === 0) {
              return res.status(500).json({ errmsg: "user isn't created." });
            }

            res.status(201).json(newUser);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => res.status(500).json(err));
};

/**
 *
 *  get user score controller
 *
 */

exports.getUserScore = (req, res, next) => {
  if (!req.params.user) {
    return res.status(400).json({ errmsg: "user is required." });
  }

  Users.findOne({ user: req.params.user })
    .then(user => {
      if (user) {
        res.status(200).json({ score: user.score });
      } else {
        res.status(400).json({ errmsg: "user does not exist." });
      }
    })
    .catch(err => es.status(500).json(err));
};

/**
 *
 *  get all users with scores
 *
 */

exports.getAllUsersScore = (req, res, next) => {
  Users.find({})
    .sort({ score: "desc" })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
};
