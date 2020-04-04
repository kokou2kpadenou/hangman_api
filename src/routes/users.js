const express = require("express");
const router = express.Router();

const {
  postUser,
  getUserScore,
  getAllUsersScore
} = require("../controllers/users");

// create user
router.post("/user", postUser);
// get user score
router.get("/user/:user", getUserScore);
// get all users with their score
router.get("/users/scores", getAllUsersScore);

module.exports = router;
