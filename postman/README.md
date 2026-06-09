# Postman — Auth API Examples

Import `everest-food-app-auth.postman_collection.json` into Postman.

## Base URL

```
http://localhost:5000
```

## Register

**POST** `/api/register`

```json
{
  "name": "Demo User",
  "email": "demo@everestfood.com",
  "password": "SecurePass123!"
}
```

| Status | Body |
| ------ | ---- |
| 201    | `{ "success": true, "message": "Registration successful", "user": { ... } }` |
| 409    | `{ "success": false, "message": "An account with this email already exists" }` |
| 400    | `{ "success": false, "message": "Validation failed", "errors": { ... } }` |

On success, Postman stores the `everest_token` HTTP-only cookie when cookie handling is enabled.

## Login

**POST** `/api/login`

```json
{
  "email": "demo@everestfood.com",
  "password": "SecurePass123!"
}
```

| Status | Body |
| ------ | ---- |
| 200    | `{ "success": true, "message": "Login successful", "user": { ... } }` |
| 401    | `{ "success": false, "message": "Invalid email or password" }` |

## Get current user (protected)

**GET** `/api/me` — requires `everest_token` cookie from login/register.

## Logout

**POST** `/api/logout` — clears the auth cookie.

## E2E verification script

With MongoDB and the backend running:

```bash
npm run verify:e2e
```
