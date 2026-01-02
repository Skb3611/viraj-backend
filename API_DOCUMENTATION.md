# API Documentation

Base URL: `/api`

## Auth Routes
Base path: `/auth`

### 1. Citizen Signup
- **Endpoint**: `/citizen/signup`
- **Method**: `POST`
- **Description**: Register a new citizen.
- **Input (JSON)**:
  ```json
  {
    "number": "string (required)",
    "password": "string (required)",
    "pincode": "string (optional)",
    "name": "string (optional)"
  }
  ```
- **Success Response (201)**:
  ```json
  {
    "message": "User created successfully",
    "user": {
      "name": "string",
      "number": "string",
      "pincode": "string"
    }
  }
  ```
- **Error Responses**:
  - `400`: Number and password are required
  - `400`: User already exists, please login
  - `400`: User not created
  - `500`: Internal server error

### 2. Citizen Login
- **Endpoint**: `/citizen/login`
- **Method**: `POST`
- **Description**: Authenticate a citizen.
- **Input (JSON)**:
  ```json
  {
    "number": "string (required)",
    "password": "string (required)"
  }
  ```
- **Success Response (200)**:
  ```json
  {
    "message": "User logged in successfully",
    "user": {
      "name": "string",
      "number": "string",
      "img": "string",
      "pincode": "string"
    }
  }
  ```
- **Error Responses**:
  - `400`: Number and password are required
  - `400`: User does not exist, please signup
  - `400`: Invalid password
  - `500`: Internal server error

### 3. Leader Signup
- **Endpoint**: `/leader/signup`
- **Method**: `POST`
- **Description**: Register a new leader.
- **Input (JSON)**:
  ```json
  {
    "number": "string (required)",
    "password": "string (required)",
    "pincode": "string (optional)",
    "name": "string (optional)",
    "post": "string (optional)"
  }
  ```
- **Success Response (201)**:
  ```json
  {
    "message": "User created successfully",
    "user": {
      "name": "string",
      "number": "string",
      "img": "string",
      "pincode": "string",
      "post": "string"
    }
  }
  ```
- **Error Responses**:
  - `400`: Number and password are required
  - `400`: User already exists, please login
  - `400`: User not created
  - `500`: Internal server error

### 4. Leader Login
- **Endpoint**: `/leader/login`
- **Method**: `POST`
- **Description**: Authenticate a leader.
- **Input (JSON)**:
  ```json
  {
    "number": "string (required)",
    "password": "string (required)"
  }
  ```
- **Success Response (200)**:
  ```json
  {
    "message": "User logged in successfully",
    "user": {
      "name": "string",
      "number": "string",
      "img": "string",
      "pincode": "string"
    }
  }
  ```
- **Error Responses**:
  - `400`: Number and password are required
  - `400`: User does not exist, please signup
  - `400`: Invalid password
  - `500`: Internal server error

---

## Citizen Routes
Base path: `/citizen`

### 1. Add Issue
- **Endpoint**: `/issue/add`
- **Method**: `POST`
- **Description**: Report a new issue.
- **Input (JSON)**:
  ```json
  {
    "number": "string (required - citizen ID)",
    "title": "string (required)",
    "desc": "string (required)",
    "pincode": "string (required)"
  }
  ```
- **Success Response (201)**:
  ```json
  {
    "message": "Issue created successfully",
    "issue": {
      "id": "string",
      "citizenId": "string",
      "title": "string",
      "desc": "string",
      "pincode": "string",
      "status": "string",
      "createdAt": "date"
    }
  }
  ```
- **Error Responses**:
  - `400`: Number,title,desc,pincode are required
  - `400`: Issue not created
  - `500`: Internal server error

### 2. Delete Issue
- **Endpoint**: `/issue/delete`
- **Method**: `POST`
- **Description**: Delete an issue.
- **Input (JSON)**:
  ```json
  {
    "number": "string (required - citizen ID)",
    "id": "string (required - issue ID)"
  }
  ```
- **Success Response (200)**:
  ```json
  {
    "message": "Issue deleted successfully",
    "issue": { ... }
  }
  ```
- **Error Responses**:
  - `400`: Number,id are required
  - `400`: Issue not deleted

---

## Leader Routes
**Note**: These routes are defined in `leader-router.ts` but currently not mounted in the main application. Assuming they will be mounted at `/leader`.

### 1. Update Issue Status
- **Endpoint**: `/issue/update-status`
- **Method**: `POST`
- **Description**: Update the status of an issue.
- **Input (JSON)**:
  ```json
  {
    "id": "string (required)",
    "status": "string (required)"
  }
  ```
- **Success Response**:
  - *Current implementation does not return a response.*
- **Error Responses**:
  - `400`: Id and status are required

### 2. Add Bill
- **Endpoint**: `/bill/add`
- **Method**: `POST`
- **Description**: Create a new bill.
- **Input (JSON)**:
  ```json
  {
    "number": "string (required - leader ID)",
    "name": "string (required)",
    "desc": "string (required)"
  }
  ```
- **Success Response (201)**:
  ```json
  {
    "message": "Bill created successfully",
    "bill": { ... }
  }
  ```
- **Error Responses**:
  - `400`: Number, name and desc are required
  - `400`: Bill not created
  - `500`: Internal server error

### 3. Delete Bill
- **Endpoint**: `/bill/delete`
- **Method**: `POST`
- **Description**: Delete a bill.
- **Input (JSON)**:
  ```json
  {
    "id": "string (required)"
  }
  ```
- **Success Response (201)**:
  ```json
  {
    "message": "Bill deleted successfully",
    "bill": { ... }
  }
  ```
- **Error Responses**:
  - `400`: Id is required
  - `400`: Bill not deleted
  - `500`: Internal server error
