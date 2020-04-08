## **Show All Games**

Returns json data about all games.

- **URL**

  hangman/games/:user

- **Method:**

  `GET`

- **URL Params**

  **Optional:**

  `user=[string]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `[game1, game2, ...]`
    
    game1, game2, ... are object of game. for more description check database documentation.

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ errmsg : "Internal server error." }`

- **Sample Call:**

  ```javascript
  let response = await fetch("http://127.0.0.1:3000/hangman/games/samuel", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });

  let result = await response.json();
  ```
  
* **Notes:**

  When the user parameter is not supplied or different from gameOwner, gameWord is empty for all active games.
