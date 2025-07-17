## Captain Registration Endpoint

### `POST /captains/register`

Register a new captain with vehicle, location, and socket details.

#### Request Body

```json
{
  "fullname": {
    "firstname": "Amit",
    "lastname": "Sharma"
  },
  "email": "amit.sharma@example.com",
  "password": "securePass123!",
  "status": "active",
  "socketId": "socket123456",
  "vehicle": {
    "color": "Black",
    "plate": "MH12AB1234",
    "capacity": 4,
    "vehicleType": "car"
  },
  "location": {
    "lat": 19.076,
    "lng": 72.8777
  }
}
```

#### Validation Rules

- `fullname.firstname`: Required
- `fullname.lastname`: Required
- `email`: Must be a valid email
- `password`: Minimum 6 characters
- `status`: Required
- `socketId`: Required
- `vehicle.color`: Required
- `vehicle.plate`: Required
- `vehicle.capacity`: Must be a number
- `vehicle.vehicleType`: Required
- `location.lat`: Required (number)
- `location.lng`: Required (number)

#### Response

- **201 Created**  
  ```json
  {
    "captain": { ...captainData },
    "token": "JWT_TOKEN"
  }
  ```
- **400 Bad Request**  
  Validation errors or if captain already exists:
  ```json
  {
    "success": false,
    "errors": [ ... ]
  }
  ```
  or
  ```json
  {
    "message": "Captain already exists"
  }
  ```

#### Example Usage

```bash
curl -X POST http://localhost:PORT/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Amit", "lastname": "Sharma" },
    "email": "amit.sharma@example.com",
    "password": "securePass123!",
    "status": "active",
    "socketId": "socket123456",
    "vehicle": {
      "color": "Black",
      "plate": "MH12AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": 19.076,
      "lng": 72.8777
    }
  }'
```

---

## Captain Login Endpoint

### `POST /captains/login`

Authenticate a captain and receive a JWT token.

#### Request Body

```json
{
  "email": "amit.sharma@example.com",
  "password": "securePass123!"
}
```

#### Validation Rules

- `email`: Must be a valid email address
- `password`: Minimum 6 characters

#### Response

- **200 OK**  
  Successful login returns the captain's data and a JWT token:
  ```json
  {
    "captain": { ...captainData },
    "token": "JWT_TOKEN"
  }
  ```
- **400 Bad Request**  
  For invalid credentials or validation errors:
  ```json
  {
    "errors": [ ... ]
  }
  ```
  or
  ```json
  {
    "message": "Email is not registered"
  }
  ```
  or
  ```json
  {
    "message": "Invalid password"
  }
  ```

#### Example Usage

```bash
curl -X POST http://localhost:PORT/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "amit.sharma@example.com",
    "password": "securePass123!"
  }'
```

#### Explanation

- Send a POST request with the captain's email and password.
- If credentials are valid, you will receive a JWT token for authentication in future requests.
- If credentials are invalid or missing, you will receive an error message indicating the problem.

---

## Captain Logout Endpoint

### `GET /captains/logout`

Logs out the captain by blacklisting the JWT token.

#### Authentication

- Requires a valid JWT token in the request cookie (`token`) or in the `Authorization` header as `Bearer <token>`.

#### Response

- **200 OK**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "message": "You are not authorized - no token found"
  }
  ```
  or
  ```json
  {
    "message": "You are not Authorized - blacklisted"
  }
  ```

#### Example Usage

```bash
curl -X GET http://localhost:PORT/captains/logout \
  -H "Authorization: Bearer JWT_TOKEN"
```

---

## Captain Profile Endpoint

### `GET /captains/profile`

Fetches the authenticated captain's profile information.

#### Authentication

- Requires a valid JWT token in the request cookie (`token`) or in the `Authorization` header as `Bearer <token>`.

#### Response

- **200 OK**
  ```json
  {
    "captain": { ...captainData }
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "message": "You are not authorized - no token found"
  }
  ```
  or
  ```json
  {
    "message": "You are not Authorized - blacklisted"
  }
  ```

#### Example Usage

```bash
curl -X GET http://localhost:PORT/captains/profile \
  -H "Authorization: Bearer JWT_TOKEN"
```

#### Explanation

- Both endpoints require authentication via JWT.
- `/logout` will invalidate the current token for future requests.
- `/profile` returns the captain's details if