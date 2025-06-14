# MySQL to Express Connection Project

This repository contains course materials and practical examples for connecting MySQL with Express.js, demonstrating how to build robust backend applications with Node.js, Express, and MySQL.

## Project Structure

```
Express_MySQL_Projects/
├── 1_intro/           # Introduction to MySQL and Express basics
├── 2_querryServer/    # Query server implementation and examples
└── README.md         # This documentation file
```

## Course Content

### 1. Introduction (1_intro)

-   Basic MySQL concepts
-   Express.js fundamentals
-   Setting up development environment
-   Basic CRUD operations

### 2. Query Server (2_querryServer)

-   Advanced MySQL queries
-   Express server implementation
-   Database connection handling
-   Error handling and best practices
-   Sample bank database implementation

## Bank Database Schema

The project includes a comprehensive bank database implementation with the following features:

### Tables

-   `branches` - Bank branch information
-   `employees` - Employee records
-   `customers` - Customer information
-   `account_types` - Different types of bank accounts
-   `accounts` - Customer accounts
-   `transactions` - Transaction history

### Key Features

-   Complete database schema with relationships
-   Sample data for testing
-   Performance optimized with indexes
-   Stored procedures for common operations
-   Views for simplified data access

## Prerequisites

-   Node.js (v14 or higher)
-   MySQL Server (v8.0 or higher)
-   npm or yarn package manager

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Express_MySQL_Projects.git
cd Express_MySQL_Projects
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

-   Create a MySQL database
-   Run the SQL scripts in the `2_querryServer` directory

4. Configure environment variables:

-   Create a `.env` file
-   Add your database credentials

## Database Connection Example

```javascript
const mysql = require("mysql2");
const express = require("express");

const connection = mysql.createConnection({
    host: "localhost",
    user: "your_username",
    password: "your_password",
    database: "bank_db",
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Successfully connected to the database");
});
```

## Best Practices

1. **Security**

    - Use environment variables for sensitive data
    - Implement proper input validation
    - Use parameterized queries to prevent SQL injection

2. **Performance**

    - Use connection pooling
    - Implement proper indexing
    - Optimize queries

3. **Error Handling**
    - Implement proper error handling
    - Use try-catch blocks
    - Log errors appropriately

## Contributing

Feel free to contribute to this project by:

1. Forking the repository
2. Creating a new branch
3. Making your changes
4. Submitting a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Resources

-   [MySQL Documentation](https://dev.mysql.com/doc/)
-   [Express.js Documentation](https://expressjs.com/)
-   [Node.js Documentation](https://nodejs.org/docs/)
