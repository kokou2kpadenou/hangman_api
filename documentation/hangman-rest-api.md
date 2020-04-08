# HANGMAN GAME API DOCUMENTATION

Below are the list of all the route with summary. Click on the link for more details.


ROUTE | URL | METHOD | PARAMS | BODY
------------ | ------------- | ------------- | ------------- | -------------
[Show User](getUserScore.md) | hangman/user/:user | GET | required | none
[Create User]() | hangman/user | POST | none | required
[Show all users with Scores]() | /users/scores | GET | none | none
[Create New Game]() | hangman/game | POST | none | required
[Show All Games]() | hangman/games/:user | GET | optional | none
[Show Game by Id]() | hangman/game/by/:id | GET | required | none
[Show Current Game]() | hangman/game/current | GET | none | none
[Cancel a Game]() | hangman/game/cancel | PATCH | none | required
[Guess]() | hangman/game/guess | PATCH | none | required

