## **Cancel a Game**

Change the status of the game to canceled and returns json data about canceled game.

- **URL**

  hangman/game/cancel

- **Method:**

  `PATCH`

- **URL Params**

  None

- **Data Params**

   **Required:**
 
   `user=[string]`
   
   `gameID=[string]`   

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `gameObject`
    
    See database documentation

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ errmsg : "gameID | user is required in body" }`

  OR
  
  - **Code:** 404 <br />
    **Content:** `{ errmsg : "gameID: 5e8d1ac0af9af03aa85c39b3 do not exist." }`

  OR  
  
  - **Code:** 410 <br />
    **Content:** `{ errmsg : "gameID: 5e8d1ac0af9af03aa85c39b3 is already canceled | is over." }`

  OR
  
  - **Code:** 422 <br />
    **Content:** `{ errmsg : "gameID: 5e8d1ac0af9af03aa85c39b3 is not for sam." }`

  OR  
  
  - **Code:** 500 <br />
    **Content:** `{ errmsg : "Internal Server Error" }`

- **Sample Call:**

  ```javascript
  let data = {
    user: "sam"
    gameID: "5e8d1ac0af9af03aa85c39b3"
  };

  let response = await fetch("http://127.0.0.1:3000/hangman/game/cancel", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(data)
  });

  let result = await response.json();
  console.log(result);
  ```
