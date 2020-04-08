## **Show Game by Id**

Returns json data about a single game with id equal to id provided.

- **URL**

  hangman/game/by/:id

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[string]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{
  "gamePlayboard": [
    "",
    "",
    "",
    ""
  ],
  "gameStatus": "canceled",
  "winner": "",
  "_id": "5e8d1ac0af9af03aa85c39b3",
  "gameOwner": "sam",
  "numberOfGuesses": 10,
  "guesses": []
}`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errmsg : "id parameter is missing." }`

  OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ errmsg : "Game with id: 5e8d1ac0af9af03aa85c39b3 does not exist." }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ errmsg : "Internal server error." }`

- **Sample Call:**

  ```javascript
  let response = await fetch("http://127.0.0.1:3000/hangman/game/by/5e8d1ac0af9af03aa85c39b3", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });

  let result = await response.json();
  ```
* **Notes:**

   Only the following field are returned: `gameOwner gamePlayboard gameStatus numberOfGuesses winner guesses`
