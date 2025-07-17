## Captain Registration Endpoint

### `POST /captains/register`

Register a new captain with vehicle details.

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
- `vehicle.color`: Required
- `vehicle.plate`: Required
- `vehicle.capacity`: Must be a number
- `vehicle.vehicleType`: Required

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
    "vehicle": {
      "color": "Black",
      "plate": "MH12AB1234",
      "capacity": 4,
      "vehicleType": "car"