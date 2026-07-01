# ToDoApp —Task Manager

Welcome to **ToDoApp**! A modern, robust, and clean-architecture Full Stack task management application. This project combines a secure and scalable **Node.js** backend with a fluid, responsive, and stylized user interface powered by the latest **Tailwind CSS v4**.

Built using an adapted MVC pattern for static web serving, featuring a comprehensive and secure authentication system.

---

## Index
1. [Key Features](#key-features)
2. [Tech Stack](#tech-stack)
3. [MVC Architecture](#model-view-controller-mvc-architecture)
    - [The Model (Data Layer)](#1-the-model-data-layer)
    - [The View (Presentation Layer)](#2-the-view-presentation-layer)
    - [The Controller (Logic Layer)](#3-the-controller-logic-layer)
    - [Request-Response Workflow Example](#request-response-workflow-example)
4. [Available Scripts](#available-scripts)
5. [Database Architecture](#database-architecture)
6. [Configuration and Environment Variables](#configuration-and-environment-variables)
7. [API Endpoints](#api-endpoints)
    - [Authentication and Users](#authentication-and-users)
    - [Task Management](#task-management)
8. [Authors](#authors)
9. [License](#license)

---

## Key Features

*   **Complete & Secure Authentication:** User registration, login, and logout managed via JWT-encrypted sessions.
*   **Email Verification:** Security workflow for account activation using temporary tokens sent via email.
*   **Route-Level Security (Middleware):** Automated user extraction using secure tokens stored in `HTTPOnly Cookies`, shielding all backend requests.
*   **Full CRUD Task Management:** Create, read, update, and delete tasks tied relationally and isolated specifically to each user.
*   **Tailwind CSS v4 Design:** Interface styled using the new *CSS-First* architecture and optimized high-performance compilation.
*   **Clean & Secure Production Structure:** Strict separation between development source files (`src/`) and production-ready optimized resources (`dist/`).

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | HTML5, JavaScript (Vanilla DOM), Tailwind CSS v4 (Oxide Engine) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose (ODM) |
| **Security** | JSON Web Tokens (JWT), Cookie-Parser, Bcrypt, CORS |
| **Utilities** | Morgan (Logging), Dotenv, Nodemon |

---

## Model-View-Controller (MVC) Architecture

This project strictly adheres to the **Model-View-Controller (MVC)** architectural pattern, adapted for a modern Full Stack application serving static web assets. This separation of concerns ensures that business logic, data structures, and user interface elements remain modular, clean, and highly maintainable.

Here is how the responsibilities are distributed across the codebase:

### 1. The Model (Data Layer)
Located in the `📂 models` directory, this layer defines the data structures and business schemas using Mongoose to interact with MongoDB Atlas.
*   **Encapsulation:** It manages data validation, default states (like setting tasks to uncompleted by default), and relational logic between entities (mapping tasks to user IDs).
*   **Independence:** The models have zero knowledge of how data is rendered or which API endpoints are requesting them.

### 2. The View (Presentation Layer)
Located in the `📂 views` directory, this layer consists of the user interface components, static HTML files, and client-side JavaScript.
*   **Vanilla DOM Interaction:** Instead of using a heavy framework, the views use asynchronous native JavaScript (`fetch` API) to send requests to backend endpoints.
*   **Dynamic UI Updates:** It dynamically updates the browser DOM based on JSON payloads returned by the controllers, handling interface statuses, styling via Tailwind CSS v4, and real-time error notifications.

### 3. The Controller (Logic Layer)
Located in the `📂 controllers` directory, this layer acts as the brain of the application, bridging the Model and the View.
*   **Request Handling:** Controllers intercept incoming HTTP requests from the client-side views, parse payload data, and execute the corresponding database operations through the models.
*   **Response Formatting:** After processing business routines (such as hashing passwords or authenticating JWTs), the controller sends back HTTP status codes and structured JSON data to feed the View.

---

### Request-Response Workflow Example

When a user interacts with the application, the data flows seamlessly through the MVC pipeline:

```text
 [ User Action ] ──> Triggered via Fetch API in View (e.g., Checking a ToDo)
                            │
                            ▼
 [ Controller ]  ──> Intercepts request, runs route security middleware (auth.js)
                            │
                            ▼
 [   Model    ]  ──> Updates 'checked: true' for the specific ObjectId in MongoDB
                            │
                            ▼
 [ Controller ]  ──> Receives DB confirmation and dispatches a JSON success status
                            │
                            ▼
 [    View    ]  ──> Updates the DOM dynamically using Tailwind v4 to strike through the task
```

---

## Available Scripts

Specific commands have been configured in the package.json file to separate the styling workflow from the server workflow:

* **Run the server in development mode:**
```bash
  npm run dev
```
(Starts the Express server using nodemon to automatically restart on every file change).

* **Compile Tailwind CSS in watch mode (Development):**
```bash
  npm run tailwind-dev
```
(Keeps the Oxide compiler active, listening for utility class changes in your views to update the CSS instantly).

* **Compile and optimize for production (Hosting):**
```bash
  npm run build
```
(Generates a fully minified output.css file, stripping spaces and comments to maximize page load speeds).

---

## Database Architecture

The application utilizes **MongoDB** with data relationships enforced via **Mongoose**.

*   **User Model:** Stores usernames, encrypted passwords, verification flags, and maintains a structural relationship with its tasks by referencing an array of `ObjectId` pointers mapping to the Todo model (`ref: 'Todo'`).
*   **Todo Model:** Stores task strings, completion status (`boolean`), and references the creator using a relational `ObjectId` pointer mapping back to the User model (`ref: 'User'`).

---

## Configuration and Environment Variables

The application relies on the following structural variables in your `.env` layout:

* `MONGO_URI_TEST`: Cluster connection string pointing to your live MongoDB Atlas deployment database.
* `MONGO_URI_PROD`: Cluster connection string pointing to your live production instance database.
* `ACCESS_TOKEN_SECRET`: High-entropy private signature key used by encryption routines to sign and decode user session JWT tokens securely.
* `EMAIL_USER` & `EMAIL_PASS`: SMTP relay server configurations used to shoot verification email hooks.

---

## API Endpoints

The API follows RESTful principles and ensures data integrity through JWT validations:

### Authentication and Users

* `POST /api/users` - Registers a new user and triggers the verification email.

* `POST /api/login` - Verifies credentials and issues the session Cookie.

* `POST /api/logout` - Securely destroys the session cookie.

### Task Management

* `GET /api/todos` - Retrieves only the tasks belonging to the authenticated user.

* `POST /api/todos` - Creates a new task associated with the user's ID.

* `PATCH /api/todos/:id` - Updates the state or content of a specific task.

* `DELETE /api/todos/:id` - Deletes a task after validating resource ownership.

---

## Authors

* [@aaronvalera](https://www.github.com/aaronvalera)
* [@Eileenax](https://www.github.com/Eileenax)

---

## License

[MIT](https://choosealicense.com/licenses/mit/)