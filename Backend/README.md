# User Registration Endpoint

## POST `/users/register`

Registers a new user in the system.

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Responses

- **201 Created**
  - Description: User registered successfully.
  - Example:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null
      }
    }
    ```

- **400 Bad Request**
  - Description: Validation failed or missing required fields.
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        }
      ]
    }
    ```

### Example Request

```sh
curl -X POST http://localhost:5001/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {"firstname": "John", "lastname": "Doe"},
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }'
```

---

# User Login Endpoint

## POST `/users/login`

Authenticates an existing user and returns a JWT token.

### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Responses

- **200 OK**
  - Description: User authenticated successfully.
  - Example:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null
      }
    }
    ```

- **400 Bad Request**
  - Description: Validation failed or missing required fields.
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- **401 Unauthorized**
  - Description: Invalid credentials or user does not exist.
  - Example:
    ```json
    {
      "message": "User does not exist"
    }
    ```
    or
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

### Example Request

```sh
curl -X POST http://localhost:5001/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---

# Get User Profile Endpoint

## GET `/users/profile`

Returns the authenticated user's profile information.

### Authentication

- Requires a valid JWT token in the `Authorization` header as a Bearer token or in the `token` cookie.

### Responses

- **200 OK**
  - Description: Returns the user's profile.
  - Example:
    ```json
    {
      "_id": "60d0fe4f5311236168a109ca",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
    ```

- **401 Unauthorized**
  - Description: Missing or invalid authentication token.
  - Example:
    ```json
    {
      "message": "Not authorized, token failed"
    }
    ```

### Example Request

```sh
curl -X GET http://localhost:5001/users/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

# User Logout Endpoint

## GET `/users/logout`

Logs out the authenticated user by blacklisting the current JWT token.

### Authentication

- Requires a valid JWT token in the `Authorization` header as a Bearer token or in the `token` cookie.

### Responses

- **200 OK**
  - Description: User logged out successfully.
  - Example:
    ```json
    {
      "message": "Logged out Successfully"
    }
    ```

- **401 Unauthorized**
  - Description: Missing or invalid authentication token.
  - Example:
    ```json
    {
      "message": "Not authorized, token failed"
    }
    ```

### Example Request

```sh
curl -X GET http://localhost:5001/users/logout \
  -H "Authorization: Bearer <your_jwt_token>"
```