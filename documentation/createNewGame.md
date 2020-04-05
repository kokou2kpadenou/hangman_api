## **Create New Game**

Creates a new game and returns json data about created game.

- **URL**

  hangman/game

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

   **Required:**
 
   `gameOwner=[string]`
   `gameWord=[string]`   
   `numberOfGuesses=[string]`
   
- **Success Response:**

  - **Code:** 201 <br />
    **Content:** `{ user : "username", score : 0 }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST<br />
    **Content:** `{ errmsg : "GameOwner | GameWord | numberOfGuesses is required in body" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  ```javascript
  let data = {
    gameOwner: "sam",
    gameWord: "PROGRAM",
    numberOfGuesses: 10
  };

  let response = await fetch("http://127.0.0.1:3000/hangman/game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(data)
  });

  let result = await response.json();
  console.log(result);
  ```

- **Sample response:**

  ```javascript
  {
    "score": 0,
    "_id": "5e87baa3cf33f10973fe7c3e",
    "user": "samvi",
    "__v": 0
  }
  ```
