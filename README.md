# Project

mysql link https://github.com/machadop1407/Simple-CRUD-React-Node-MySQL/blob/main/server/index.js

running at Port 5000, if failed it will auto switch to 3000

```bash
npm start
```

development

```bash
npm run dev
```

install dependencies before start or test

```bash
npm install
```

Package currently including: (please check package.json file)

"bcrypt": "^5.0.0",
"dotenv": "^8.2.0",
"esm": "^3.2.25",
"express": "^4.17.1",
"jsonwebtoken": "^8.5.1",
"nodemon": "^2.0.6",
"uuid": "^8.3.1"

## Route Requirements

**Note**: Any validation or any other errors for requests should use the appropriate status code, alongside the documented response body for the error.

1. Route to _create_ an entry when the user submits their contact form:
   `POST /contact_form/entries`

   Request body expected:

   ```json
   {
     "name": "some string",
     "email": "address@email.com", // should be a valid email address
     "phoneNumber": "2343331234",
     "content": "User's message goes here"
   }
   ```

   When saving the above, a property `id` should be added to the object that uses the format of a `UUID v4`. You can use a package such as [uuid](https://www.npmjs.com/package/uuid) to generate it.
   Successful request should return the created object, including its `id` with the appropriate status code, e.g.:

   ```json
   {
     "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
     "name": "some string",
     "email": "address@email.com",
     "phoneNumber": "2343331234",
     "content": "User's message goes here"
   }
   ```

   ![](2020-11-30-12-06-58.png)

   In the event the body of the request is missing any of the following properties, or these fields have incorrect values: `name, email, phoneNumber, content`, it should be treated as a `Bad Request`, and the response should be in the format of:

   ```json
   {
     "message": "validation error",
     "invalid": ["email", "phoneNumber"] // this array should be populated with name of any required property that is missing or has incorrect data
   }
   ```

   ![](2020-11-30-12-07-56.png)

2. Route to _create_ a user:
   `POST /users`

   Request body accepted (all properties required):

   ```json
   {
     "name": "Some Name",
     "password": "password", // must be minimum 8 characters
     "email": "address@email.com" // must be a valid email address
   }
   ```

   When saving the above, a property `id` should be added to the object that uses the format of a `UUID v4`. You can use a package such as [uuid](https://www.npmjs.com/package/uuid) to generate it.
   Successful request should return the created object, including its `id` with the appropriate status code, e.g.:

   ```json
   {
     "id": "b34adff-3b7d-4bad-9bdd-2b0d7b3dcb6d",
     "name": "Some Name",
     "email": "address@email.com"
   }
   ```

   correct output
   ![](2020-12-01-16-36-51.png)

---

In the event any of the properties are missing, or the wrong values are provided, alongside the appropriate status code (`Bad Request`), the response should be in the format of:

```json
{
  "message": "validation error",
  "invalid": ["email"] // this array should be populated with name of any required property that is missing or has incorrect data
}
```

incorrect
missing part
![](2020-11-30-12-11-15.png)

invalid email
![](2020-11-30-12-11-40.png)

invalid password
![](2020-11-30-12-13-13.png)

---

3. Route to log a registered user in to _create_ a JWT (JSON Web Token) token:
   `POST /auth`

   Expected request:

   ```json
   {
     "email": "address@email.com",
     "password": "somepassword"
   }
   ```

   Successful response (alongside the appropriate status code):

   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
   }
   ```

   ![](2020-11-30-12-14-42.png)

   In the event the email and password do not match, `Unauthorized` status code should be given, with following response body:

   ```json
   {
     "message": "incorrect credentials provided"
   }
   ```

   Incorrect post results:

![](2020-11-30-12-15-14.png)

or
![](2020-11-30-12-15-40.png)

or
![](2020-11-30-12-16-05.png)

---

4. Route to _get_ a listing of all submissions when given a valid JWT is provided as part of the :

   ```
   GET /contact_form/entries
   Authorization: bearer token
   ```

   Where token is the one received from the route definied above.
   Upon success, an array consisting of all objects for the contact form entries should be displayed, e.g.:

   ```json
   [
     {
       "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
       "name": "some string",
       "email": "address@email.com",
       "phoneNumber": "2343331234",
       "content": "User's message goes here"
     },
     {
       "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
       "name": "another one",
       "email": "msn@email.com",
       "phoneNumber": "4",
       "content": "Another message"
     }
   ]
   ```

![](2020-11-30-12-21-50.png)

In the event the JWT is invalid, or not provided, the `Forbidden` status code should be returned alongside with a reason why, e.g.:

```json
{
  "message": "token not provided" // other options for this message include: "token expired"
}
```

---

5. Route to _get_ a specific submission when given an ID alongside a valid JWT:
   ```
   GET /contact_form/entries/:id
   Authorization: bearer token
   ```
   If successful, the response, alongside the appropriate status code should be similar to below based on the submission entry id given:
   ```json
   {
     "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
     "name": "some string",
     "email": "address@email.com",
     "phoneNumber": "2343331234",
     "content": "User's message goes here"
   }
   ```
   ![](2020-11-30-12-31-49.png)

If requested ID is not found, `Not Found` status code should be returned alongside a response:

```json
{
  "message": "entry 23bacf-3b7d-4bad-9bdd-2b0d7b3dcb6d not found"
}
```

![](2020-11-30-12-35-51.png)

In the event the JWT is invalid, or not provided, the `Forbidden` status code should be returned alongside with a reason why, e.g.:

```json
{
  "message": "token not provided" // other options for this message include: "token expired"
}
```

![](2020-11-30-12-36-15.png)

Part 2 :

Express default error handling middleware is setup where any route not found should return back the appropriate status code (Not Found) and the following response: {"message": "not found"}.

incorrect contact_form/entires route
![](2020-11-30-12-05-26.png)

incorrect user route
![](2020-11-30-12-08-58.png)
