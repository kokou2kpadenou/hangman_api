# HANGMAN GAME API DOCUMENTATION

Below are the list of all the route with summary. Click on the link for more details.


ROUTE | URL | METHOD | PARAMS | BODY
------------ | ------------- | ------------- | ------------- | -------------
[Show User](getUserScore.md) | hangman/user/:user | GET | required | none
[Create User](createNewGame.md) | hangman/user | POST | none | required
[Show all users with Scores](getAllUsersScores.md) | /users/scores | GET | none | none
[Create New Game](createNewGame.md) | hangman/game | POST | none | required
[Show All Games](getAllGames.md) | hangman/games/:user | GET | optional | none
[Show Game by Id](getGameById.md) | hangman/game/by/:id | GET | required | none
[Show Current Game](getCurrentGame.md) | hangman/game/current | GET | none | none
[Cancel a Game](cancelGame.md) | hangman/game/cancel | PATCH | none | required
[Guess](guess.md) | hangman/game/guess | PATCH | none | required

