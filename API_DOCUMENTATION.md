# API Documentation

## Dummy User Creds

### Citizen 1 Creds

- **name**: `Rahul Sharma`
- **Number**: `9876543210`
- **Password**: `password123`
### Citizen 2 Creds

- **name**: `Priya Patel`
- **Number**: `9876543211`
- **Password**: `password123`

### Leader 1 Creds

- **name**: `Vikram Singh`
- **Number**: `1122334455`
- **Password**: `password123`
### Leader 2 Creds

- **name**: `Anjali Gupta`
- **Number**: `5544332211`
- **Password**: `password123`


## Auth Routes
Base URL: `/api`
**File**: `src/routes/auth-router.ts`
Base path: `/auth`

### 1. Citizen Signup
- **Endpoint**: `/citizen/signup`
- **Method**: `POST`
- **Input (JSON)**:
  ```json
  {
    "number": "string",
    "password": "string",
    "pincode": "string",
    "name": "string"
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
- **Input (JSON)**:
  ```json
  {
    "number": "string",
    "password": "string"
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
- **Input (JSON)**:
  ```json
  {
    "number": "string",
    "password": "string",
    "pincode": "string",
    "name": "string",
    "post": "string"
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
- **Input (JSON)**:
  ```json
  {
    "number": "string",
    "password": "string"
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
**File**: `src/routes/citizen-router.ts`
Base path: `/citizen`

### 1. Add Issue
- **Endpoint**: `/issue/add`
- **Method**: `POST`
- **Input (JSON)**:
  ```json
  {
    "number": "string",
    "title": "string",
    "desc": "string",
    "pincode": "string"
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
- **Input (JSON)**:
  ```json
  {
    "number": "string",
    "id": "string"
  }
  ```
- **Success Response (200)**:
  ```json
  {
    "message": "Issue deleted successfully",
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
  - `400`: Number,id are required
  - `400`: Issue not deleted

---

## Leader Routes
**File**: `src/routes/leader-router.ts`
Base path: `/leader`

### 1. Update Issue Status
- **Endpoint**: `/issue/update-status`
- **Method**: `POST`
- **Input (JSON)**:
  ```json
  {
    "id": "string",
    "status": "string"
  }
  ```
- **Success Response**:
  - *No response body returned*
- **Error Responses**:
  - `400`: Id and status are required

### 2. Add Bill
- **Endpoint**: `/bill/add`
- **Method**: `POST`
- **Input (JSON)**:
  ```json
  {
    "number": "string",
    "name": "string",
    "desc": "string"
  }
  ```
- **Success Response (201)**:
  ```json
  {
    "message": "Bill created successfully",
    "bill": {
      "id": "string",
      "leaderId": "string",
      "name": "string",
      "desc": "string",
      "createdAt": "date"
    }
  }
  ```
- **Error Responses**:
  - `400`: Number, name and desc are required
  - `400`: Bill not created
  - `500`: Internal server error

### 3. Delete Bill
- **Endpoint**: `/bill/delete`
- **Method**: `POST`
- **Input (JSON)**:
  ```json
  {
    "id": "string"
  }
  ```
- **Success Response (201)**:
  ```json
  {
    "message": "Bill deleted successfully",
    "bill": {
      "id": "string",
      "leaderId": "string",
      "name": "string",
      "desc": "string",
      "createdAt": "date"
    }
  }
  ```
- **Error Responses**:
  - `400`: Id is required
  - `400`: Bill not deleted
  - `500`: Internal server error

---

## General Routes
**File**: `src/routes/general-router.ts`
Base path: `/` (mounted directly under `/api`)

### 1. Get All Issues
- **Endpoint**: `/all-issues`
- **Method**: `GET`
- **Input**: None
- **Success Response (200)**:
  ```json
  {
    "message": "Issues fetched successfully",
    "issues": [
      {
        "id": "string",
        "citizenId": "string",
        "title": "string",
        "desc": "string",
        "pincode": "string",
        "status": "string",
        "createdAt": "date",
        "comments": [],
        "citizen": {
          "id": "string",
          "name": "string",
          "number": "string",
          "img": "string",
          "pincode": "string"
        }
      }
    ]
  }
  ```
- **Error Responses**:
  - `400`: Issues not fetched
  - `500`: Internal server error

### 2. Get Issue By ID
- **Endpoint**: `/get-issue-by-id/:id`
- **Method**: `GET`
- **Input**: `id` (URL Parameter)
- **Success Response (200)**:
  ```json
  {
    "message": "Issue fetched successfully",
    "issue": {
      "id": "string",
      "citizenId": "string",
      "title": "string",
      "desc": "string",
      "pincode": "string",
      "status": "string",
      "createdAt": "date",
      "comments": [],
      "citizen": {
        "id": "string",
        "name": "string",
        "number": "string",
        "img": "string",
        "pincode": "string"
      }
    }
  }
  ```
- **Error Responses**:
  - `400`: Issue id is required
  - `400`: Issue not fetched
  - `500`: Internal server error

### 3. Get Issues By Pincode
- **Endpoint**: `/get-issues-by-pincode/:pincode`
- **Method**: `GET`
- **Input**: `pincode` (URL Parameter)
- **Success Response (200)**:
  ```json
  {
    "message": "Issues fetched successfully",
    "issues": [
      {
        "id": "string",
        "citizenId": "string",
        "title": "string",
        "desc": "string",
        "pincode": "string",
        "status": "string",
        "createdAt": "date",
        "comments": [],
        "citizen": {
          "id": "string",
          "name": "string",
          "number": "string",
          "img": "string",
          "pincode": "string"
        }
      }
    ]
  }
  ```
- **Error Responses**:
  - `400`: Pincode is required
  - `400`: Issues not fetched
  - `500`: Internal server error

### 4. Get All Bills
- **Endpoint**: `/get-bills`
- **Method**: `GET`
- **Input**: None
- **Success Response (200)**:
  ```json
  {
    "message": "Bills fetched successfully",
    "bills": [
      {
        "id": "string",
        "leaderId": "string",
        "name": "string",
        "desc": "string",
        "budget": "string",
        "likes": "number",
        "createdAt": "date",
        "comments": [],
        "leader": {
          "id": "string",
          "name": "string",
          "number": "string",
          "img": "string",
          "pincode": "string",
          "post": "string"
        }
      }
    ]
  }
  ```
- **Error Responses**:
  - `400`: Bills not fetched
  - `500`: Internal server error

### 5. Get Bill By ID
- **Endpoint**: `/get-bill/:id`
- **Method**: `GET`
- **Input**: `id` (URL Parameter)
- **Success Response (200)**:
  ```json
  {
    "message": "Bill fetched successfully",
    "bill": {
      "id": "string",
      "leaderId": "string",
      "name": "string",
      "desc": "string",
      "budget": "string",
      "likes": "number",
      "createdAt": "date",
      "comments": [],
      "leader": {
        "id": "string",
        "name": "string",
        "number": "string",
        "img": "string",
        "pincode": "string",
        "post": "string"
      }
    }
  }
  ```
- **Error Responses**:
  - `400`: Bill id is required
  - `400`: Bill not fetched
  - `500`: Internal server error

### 6. Add Comment
- **Endpoint**: `/comment`
- **Method**: `POST`
- **Input (JSON)**:
  ```json
  {
    "id": "string",
    "comment": "string",
    "type": "string"
  }
  ```
- **Success Response (201)**:
  ```json
  {
    "message": "Comment created successfully",
    "newComment": {
      "id": "string",
      "text": "string",
      "createdAt": "date",
      "issueId": "string (nullable)",
      "billId": "string (nullable)"
    }
  }
  ```
- **Error Responses**:
  - `400`: Issue id and comment are required
  - `400`: Type is required
  - `400`: Comment not created
  - `500`: Internal server error
