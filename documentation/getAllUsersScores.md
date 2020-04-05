## **Show all users with Scores**

Returns json data about users with scores.

- **URL**

  /users/scores

- **Method:**

  `GET`

- **URL Params**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `[{ user : "user1", score : 0 }, { user : "user2", score : 2 }, { user : "user3", score : 10 }]`

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ errmsg : "Internal server error." }`

- **Sample Call:**

  ```javascript
  let response = await fetch("http://127.0.0.1:3000/hangman/users/scores", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });

  let result = await response.json();
  ```
