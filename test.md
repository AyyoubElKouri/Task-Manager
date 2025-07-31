# Create new Task

**Module:** Tasks  
**API:** POST http://localhost:3000/api/tasks  
**Author:** Ayyoub el kouri  
**Date:** 29-07-2025  
**Version:** 1.0.0

## Request

**Method:** POST  
**URL:** http://localhost:3000/api/tasks

### Authentication
- **Required:** true
- **Strategy:** JWT

### Authorization
User

### Headers
- **Content-Type:** application/json
- **Authorization:** Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
- **x-api-key:** SomeKey34334234234

### Path Parameters
NONE

### Query Parameters
NONE

### Request Body
```json
{
  "source": {
    "type": "string",
    "validationRules": {
      "required": true,
      "minLength": "2 chars",
      "maxLength": "20 chars"
    },
    "example": "KodeKloud"
  },
  "description": {
    "type": "string",
    "validationRules": {
      "required": true,
      "minLength": "2 chars",
      "maxLength": "200 chars"
    },
    "example": "Learn Docker from Docker Training Course"
  },
  "duration": {
    "type": "integer",
    "description": "Indicates duration in minutes",
    "validationRules": {
      "required": true,
      "min": 2,
      "max": "6 * 60 (6 hours)"
    },
    "example": 120
  }
}
```

## Response

### SUCCESS

**CASE (201):**
```
Headers: { Location: "http://localhost:3000/api/tasks/125232" }
Body:
{
  "success": true,
  "message": "Task Created Successfully.",
  "task": {
    "id": 125232,
    "source": "KodeKloud",
    "description": "Learn Docker from Docker Training Course",
    "duration": 120,
    "completed": false
  }
}
```

### ERROR

**CASE 1 (400):**
```json
{
  "success": false,
  "message": "Source, description or duration is not valid field",
  "details": { "source": "Must be at least 2 characters" },
  "error": "VALIDATION_ERROR"
}
```

**CASE 2 (400):**
```json
{
  "success": false,
  "message": "Unexpected fields were found in the request body",
  "details": ["name", "date"],
  "error": "UNEXPECTED_FIELD"
}
```

**CASE 3 (401):**
```json
{
  "success": false,
  "message": "User not authenticated",
  "error": "AUTHENTICATION_FAILED"
}
```

**CASE 4 (401):**
```json
{
  "success": false,
  "message": "Invalid or missing API key",
  "error": "API_KEY_INVALID"
}
```

**CASE 5 (403):**
```json
{
  "success": false,
  "message": "User not authorized to this resource",
  "error": "AUTHORIZATION_FAILED"
}
```

**CASE 6 (500):**
```json
{
  "success": false,
  "message": "Unknown error",
  "error": "INTERNAL_SERVER_ERROR"
}
```