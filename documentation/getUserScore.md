## **Show User**

Returns json data about a single user.

- **URL**

  hangman/user/:user

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `user=[string]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ user : "username", score : 2 }`

- **Error Response:**


  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errmsg : "parameter user is required." }`

  OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ errmsg : "User does not exist" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ errmsg : "Internal server error." }`

- **Sample Call:**

  ```javascript
  let response = await fetch("http://127.0.0.1:3000/hangman/user/username", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });

  let result = await response.json();
  ```
