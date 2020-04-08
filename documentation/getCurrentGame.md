## **Show Current Game**

Returns json data about the current playing game.

- **URL**

  hangman/game/current

- **Method:**

  `GET`

- **URL Params**

  none

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{
  "gamePlayboard": [
    "P",
    "R",
    "O",
    "P",
    "O",
    "",
    "I",
    "T",
    "I",
    "O",
    ""
  ],
  "gameStatus": "active",
  "winner": "",
  "_id": "5e8d2d67af9af03aa85c39b4",
  "gameOwner": "sam",
  "numberOfGuesses": 10,
  "guesses": [
    {
      "_id": "5e8d2da0af9af03aa85c39b6",
      "letterGuessed": "P",
      "guessingPlayer": "mael",
      "guessingCorrect": true
    },
    {
      "_id": "5e8d2da4af9af03aa85c39b7",
      "letterGuessed": "F",
      "guessingPlayer": "mael",
      "guessingCorrect": false
    },
    {
      "_id": "5e8d2da6af9af03aa85c39b8",
      "letterGuessed": "R",
      "guessingPlayer": "mael",
      "guessingCorrect": true
    },
    {
      "_id": "5e8d2da9af9af03aa85c39b9",
      "letterGuessed": "O",
      "guessingPlayer": "mael",
      "guessingCorrect": true
    },
    {
      "_id": "5e8d2e32af9af03aa85c39ba",
      "letterGuessed": "I",
      "guessingPlayer": "mael",
      "guessingCorrect": true
    },
    {
      "_id": "5e8d2e36af9af03aa85c39bb",
      "letterGuessed": "T",
      "guessingPlayer": "mael",
      "guessingCorrect": true
    }
  ]
}`

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ errmsg : "Internal server error." }`

- **Sample Call:**

  ```javascript
  let response = await fetch("http://127.0.0.1:3000/hangman/game/current", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });

  let result = await response.json();
  ```
