## **Guess**

Update game with guess Letter returns json data about updated game.

- **URL**

  hangman/game/guess

- **Method:**

  `PATCH`

- **URL Params**

  None

- **Data Params**

   **Required:**
 
   `guessLetter=[string]`
   
   `guessingPlayer=[string]`
   
   `gameID=[string]`    

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

  - **Code:** 400 <br />
    **Content:** `{ errmsg : "gameID | guessingLetter | guessingPlayer is required in body" }`

  OR
  
  - **Code:** 404 <br />
    **Content:** `{ errmsg : "game with 5e8d1ac0af9af03aa85c39b3, does not exist | user does not exist" }`

  OR
  
  - **Code:** 410 <br />
    **Content:** `{ errmsg : "game with 5e8d1ac0af9af03aa85c39b3, has been canceled | game with 5e8d1ac0af9af03aa85c39b3, is over | user can't play is owner game | "L" was proposed by another user." }`

  OR 
  
  - **Code:** 500 <br />
    **Content:** `{ errmsg : "Internal Server Error" }`

- **Sample Call:**

  ```javascript
  let data = {
    gameID: "5e8d1ac0af9af03aa85c39b3",
    guessingPlayer: 'sam',
    guessLetter: "L"
  };

  let response = await fetch("http://127.0.0.1:3000/hangman/game/guess", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(data)
  });

  let result = await response.json();
  console.log(result);
  ```
  
* **Notes:**

   Only the following field are returned: `gameOwner gamePlayboard gameStatus numberOfGuesses winner guesses`  
