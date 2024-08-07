# CRUD API with PHP and MySQL

This project is a simple CRUD (Create, Read, Update, Delete) API using PHP and MySQL. The API allows users to perform basic CRUD operations on a single table in a MySQL database. The main entity in this example is `user`.
Assigned by DIGITAL EMPOWERMENT PAKISTAN in BACKEND DEVELOPMENT Internship.

## Table of Contents
- [File Structure](#file-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

## File Structure

The project structure is organized as follows:

```
crud_api/
├── include/
│   └── db_connect.php
├── api/
│   ├── create_user.php
│   ├── read_user.php
│   ├── edit_user.php
│   ├── update_user.php
│   └── delete_user.php
├── public/
│   ├── index.html
│   └── script.js
└── README.md
```

- `include/db_connect.php`: Database connection file.
- `api/create_user.php`: Endpoint to create a new user.
- `api/read_user.php`: Endpoint to fetch all users.
- `api/edit_user.php`: Endpoint to fetch details of a specific user for editing.
- `api/update_user.php`: Endpoint to update user details.
- `api/delete_user.php`: Endpoint to delete a user.
- `public/index.html`: Front-end HTML file to interact with the API.
- `public/script.js`: JavaScript file to handle front-end logic and AJAX requests.
- `README.md`: Project documentation file.

## Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/DEP.git
   cd CRUD_API
   ```

2. **Create a MySQL database and a `users` table:**
   ```sql
   CREATE DATABASE dep_crud_api;
   USE dep_crud_api;

   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL,
       phone VARCHAR(15) NOT NULL
   );
   ```

3. **Configure the database connection:**
   Update the `include/db_connect.php` file with your database credentials:
   ```php
   <?php
   $servername = "localhost";
   $username = "your_username";
   $password = "your_password";
   $dbname = "dep_crud_api";

   $connection = new mysqli($servername, $username, $password, $dbname);

   if ($connection->connect_error) {
       die("Connection failed: " . $connection->connect_error);
   }
   ?>
   ```

4. **Start a local server:**
   If you have PHP installed, you can start a local server using the following command:
   ```bash
   php -S localhost:8080
   ```

## Usage

1. **Open the `index.html` file:**
   Navigate to `http://localhost:8080/public/index.html` in your browser.

2. **Perform CRUD operations:**
   - **Create:** Add a new user by filling out the form and clicking "Insert User".
   - **Read:** View all users in the table.
   - **Update:** Edit a user's details by clicking the edit button and submitting the form.
   - **Delete:** Remove a user by clicking the delete button and confirming the action.

## API Endpoints

- **Create User**: `POST /api/create_user.php`
  - Request Body: `{ "name": "John Doe", "email": "john@example.com", "phone": "1234567890" }`
  - Response: `{ "status": true, "message": "User Inserted Successfully" }`

- **Fetch Users**: `GET /api/read_user.php`
  - Response: `{ "status": true, "data": [...] }`

- **Edit User**: `GET /api/edit_user.php?user_id={id}`
  - Response: `{ "status": true, "data": { "id": 1, "name": "John Doe", "email": "john@example.com", "phone": "1234567890" } }`

- **Update User**: `POST /api/update_user.php`
  - Request Body: `{ "user_id": 1, "name": "John Smith", "email": "johnsmith@example.com", "phone": "0987654321" }`
  - Response: `{ "status": true, "message": "User updated successfully" }`

- **Delete User**: `POST /api/delete_user.php`
  - Request Body: `{ "user_id": 1 }`
  - Response: `{ "status": true, "message": "User deleted successfully" }`

## Technologies Used

- PHP
- MySQL
- HTML
- CSS (Bootstrap)
- JavaScript (jQuery, AJAX)

## License

This project is licensed under the MIT License.
