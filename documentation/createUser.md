## **Create User**

Returns json data about a single user.

- **URL**

  hangman/user

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  `{ "user" : "String" }`

- **Success Response:**

  - **Code:** 201 <br />
    **Content:** `{ user : "username", score : 0 }`

  OR

  - **Code:** 200 <br />
    **Content:** `{ user : "username", score : 0 }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ errmsg : "User is required in body" }`

  OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  ```javascript
  let data = {
    user: "sam"
  };

  let response = await fetch("http://127.0.0.1:3000/hangman/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(user)
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
