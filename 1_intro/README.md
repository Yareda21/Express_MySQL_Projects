# MySQL Database Connection

## Setup Requirements

1. Install required packages:

```bash
npm install express dotenv nodemon mysql2
```

2. Install MySQL and MySQL Workbench

    - Download MySQL from [official website](https://dev.mysql.com/downloads/)
    - Install MySQL Workbench for database management
    - Make sure MySQL service is running

3. Required Environment Variables (.env):

```env
MYSQL_HOST=localhost
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=world
TABLE_NAME=city  # optional, defaults to 'city'
```

## Database Structure

This project uses the default MySQL "world" database with the following table structure:

```sql
CREATE TABLE city (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(35),
    CountryCode CHAR(3),
    District VARCHAR(20),
    Population INT
);
```

## Database Functions

### 1. Get All Cities

```javascript
getNotes();
```

Returns all cities from the database.

-   Returns: Array of city objects with all columns
-   Throws: Error if database connection fails
-   Example return:

```javascript
[
    {
        ID: 1,
        Name: "Kabul",
        CountryCode: "AFG",
        District: "Kabol",
        Population: 1780000,
    },
    // ... more cities
];
```

### 2. Get Single City

```javascript
singleCity(id: number)
```

Returns a single city by ID.

-   Parameters:
    -   `id`: City ID (must be a number)
-   Returns: Single city object or null if not found
-   Throws: Error if invalid ID or database connection fails
-   Example return:

```javascript
{
    ID: 1,
    Name: "Kabul",
    CountryCode: "AFG",
    District: "Kabol",
    Population: 1780000
}
```

### 3. Create City

```javascript
createCity(
    name: string,
    countryCode: string,
    district: string,
    population: number
)
```

Creates a new city and returns the new city's ID.

-   Parameters:
    -   `name`: City name (string)
    -   `countryCode`: 3-letter country code (string)
    -   `district`: District name (string)
    -   `population`: Population count (number)
-   Returns: ID of the newly created city
-   Throws: Error if invalid parameters or database connection fails
-   Example return: `123` (new city ID)

### 4. Edit City

```javascript
editCity(
    colName: string,  // 'Name' | 'CountryCode' | 'District' | 'Population'
    id: number,
    data: string | number
)
```

Updates a specific column for a city.

-   Parameters:
    -   `colName`: Column to update (must be one of: 'Name', 'CountryCode', 'District', 'Population')
    -   `id`: City ID to update
    -   `data`: New value for the column
-   Returns: Query result object
-   Throws: Error if invalid parameters or database connection fails
-   Example return:

```javascript
{
    affectedRows: 1,
    changedRows: 1
}
```

### 5. Delete City

```javascript
deleteCity(id: number)
```

Deletes a city by ID.

-   Parameters:
    -   `id`: City ID to delete
-   Returns: Query result object
-   Throws: Error if invalid ID or database connection fails
-   Example return:

```javascript
{
    affectedRows: 1;
}
```

## Example Usage

```javascript
// Get all cities
const cities = await getNotes();

// Get city with ID 1
const city = await singleCity(1);

// Create new city
const newCityId = await createCity("New York", "USA", "New York", 8000000);

// Update city name
await editCity("Name", 1, "New Name");

// Delete city
await deleteCity(1);
```

## Error Handling

All functions include error handling for:

-   Invalid parameters
-   Database connection issues
-   Query execution errors
-   Missing or invalid data

## Best Practices

1. Always use try-catch blocks when calling these functions
2. Validate input data before passing to functions
3. Check return values for null/undefined
4. Use environment variables for configuration
5. Keep database credentials secure

## Common Issues

1. Database connection fails
    - Check if MySQL service is running
    - Verify environment variables
    - Ensure correct database name
2. Invalid parameters
    - Check parameter types
    - Verify required fields
    - Ensure valid column names
3. Query errors
    - Check table structure
    - Verify data types
    - Ensure unique constraints
