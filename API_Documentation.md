# 🛠️ API Endpoints Documentation

### 🔐 **Authentication Router** (`/login`)

| **HTTP Method** | **Endpoint**  | **Description**                                              | **Middleware**            | **Request Body**                           | **Response**                                     |
|-----------------|---------------|--------------------------------------------------------------|---------------------------|--------------------------------------------|--------------------------------------------------|
| `POST`          | `/login`      | Authenticates the user and generates a JWT token for login.   | `ValidateToken`            | `{ email, password }`                      | `200 OK` with user data (without password) and JWT token stored in cookies. `401 Unauthorized` if invalid credentials. |

### Usage
- Logs in users by validating email and password.
- If successful, returns a JWT token that is stored in a cookie for further authentication.
- If credentials are incorrect, a `401 Unauthorized` response is sent.

&nbsp;
---

### 🔑 **Authorization Router** (`/grant`, `/revoke`, `/change`, `/get-all`)

| **HTTP Method** | **Endpoint**        | **Description**                                            | **Middleware**             | **Request Body**                           | **Response**                                       |
|-----------------|---------------------|------------------------------------------------------------|----------------------------|--------------------------------------------|----------------------------------------------------|
| `POST`          | `/grant`            | Grants a role to a user by adding them to the database.     | `ValidateToken`, `ValidateRole` | `{ email, role }`                           | `200 OK` with user data and success message.        |
| `POST`          | `/revoke`           | Revokes a user's role by marking it as "Deleted".           | `ValidateToken`, `ValidateRole` | `{ userId }`                                | `200 OK` with success message if user role is revoked. |
| `PUT`           | `/change`           | Changes a user's role.                                     | `ValidateToken`, `ValidateRole` | `{ userId, role }`                          | `200 OK` with updated user data and success message. |
| `GET`           | `/get-all`          | Retrieves all users with valid roles, excluding "Deleted".  | `ValidateToken`, `ValidateRole` | None                                       | `200 OK` with a list of users excluding deleted ones. |

### Usage
- `/grant`: Grants a specified role to a new user and sends an invitation.
- `/revoke`: Revokes the role of a user, marking them as "Deleted" and "Revoked".
- `/change`: Changes an existing user's role.
- `/get-all`: Retrieves all users, excluding those with the "Deleted" role, and returns a sanitized version of the user data.

&nbsp;
---

### 🛠️ **Workspace Router** (`/set`, `/get`)

| **HTTP Method** | **Endpoint**      | **Description**                                           | **Middleware**             | **Request Body**                           | **Response**                                     |
|-----------------|-------------------|-----------------------------------------------------------|----------------------------|--------------------------------------------|--------------------------------------------------|
| `POST`          | `/set`            | Sets workspace data by updating the shared content.       | `ValidateToken`, `ValidateRole` | `{ data }`                                  | `200 OK` with success message.                    |
| `GET`           | `/get`            | Retrieves the current workspace data.                     | `ValidateToken`, `ValidateRole` | None                                       | `200 OK` with current workspace data.            |

### Usage
- `/set`: Allows setting new workspace data, which can be modified by users with appropriate roles.
- `/get`: Retrieves the current workspace data for users with proper access.

&nbsp;
---

### 💡 **Middleware Overview**

| **Middleware**         | **Purpose**                                                                                   |
|------------------------|-----------------------------------------------------------------------------------------------|
| `ValidateToken`         | Ensures that the request contains a valid authentication token and is authorized.            |
| `ValidateRole`          | Validates the user role (Admin, Editor, or Viewer) for access to specific routes and actions. |

---
