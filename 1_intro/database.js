import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// creating a pool
const pool = mysql
    .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    })
    .promise();

const TABLE_NAME = process.env.TABLE_NAME || "city";
// creating queries
// getting all the cities

/**
 * Get all cities from the database
 * @returns {Promise<Array>} Array of city objects
 * @throws {Error} If database query fails
 */
async function getCities() {
    try {
        const [rows] = await pool.query("SELECT * FROM ??", [TABLE_NAME]);
        return rows;
    } catch (error) {
        console.error("Error fetching cities:", error);
        throw new Error("Failed to fetch cities from database");
    }
}

/**
 * Get a single city by ID
 * @param {number} id - The city ID
 * @returns {Promise<Object|null>} City object or null if not found
 * @throws {Error} If database query fails
 */
async function singleCity(id) {
    if (!id || typeof id !== "number") {
        throw new Error("Invalid city ID provided");
    }

    try {
        const [rows] = await pool.query("SELECT * FROM ?? WHERE ID = ?", [
            TABLE_NAME,
            id,
        ]);
        return rows[0] || null;
    } catch (error) {
        console.error("Error fetching city:", error);
        throw new Error("Failed to fetch city from database");
    }
}

/**
 * Create a new city
 * @param {string} name - City name
 * @param {string} countryCode - Country code
 * @param {string} district - District name
 * @param {number} population - Population count
 * @returns {Promise<number>} ID of the newly created city
 * @throws {Error} If database query fails or invalid input
 */
async function createCity(name, countryCode, district, population) {
    // Input validation
    if (!name || typeof name !== "string") throw new Error("Invalid city name");
    if (!countryCode || typeof countryCode !== "string")
        throw new Error("Invalid country code");
    if (!district || typeof district !== "string")
        throw new Error("Invalid district");
    if (!population || typeof population !== "number" || population < 0) {
        throw new Error("Invalid population");
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO ?? (Name, CountryCode, District, Population)
            VALUES (?, ?, ?, ?)`,
            [TABLE_NAME, name, countryCode, district, population]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error creating city:", error);
        throw new Error("Failed to create city in database");
    }
}

/**
 * Edit a city's data
 * @param {string} colName - Column name to update
 * @param {number} id - City ID
 * @param {string|number} data - New data value
 * @returns {Promise<Object>} Query result
 * @throws {Error} If database query fails or invalid input
 */
async function editCity(colName, id, data) {
    // Input validation
    if (!colName || typeof colName !== "string")
        throw new Error("Invalid column name");
    if (!id || typeof id !== "number") throw new Error("Invalid city ID");
    if (data === undefined || data === null)
        throw new Error("Invalid data value");

    // Validate column name to prevent SQL injection
    const allowedColumns = ["Name", "CountryCode", "District", "Population"];
    if (!allowedColumns.includes(colName)) {
        throw new Error("Invalid column name");
    }

    try {
        const [result] = await pool.query("UPDATE ?? SET ?? = ? WHERE ID = ?", [
            TABLE_NAME,
            colName,
            data,
            id,
        ]);
        return result;
    } catch (error) {
        console.error("Error updating city:", error);
        throw new Error("Failed to update city in database");
    }
}

/**
 * Delete a city
 * @param {number} id - City ID
 * @returns {Promise<Object>} Query result
 * @throws {Error} If database query fails or invalid input
 */
async function deleteCity(id) {
    if (!id || typeof id !== "number") {
        throw new Error("Invalid city ID");
    }

    try {
        const [result] = await pool.query("DELETE FROM ?? WHERE ID = ?", [
            TABLE_NAME,
            id,
        ]);
        return result;
    } catch (error) {
        console.error("Error deleting city:", error);
        throw new Error("Failed to delete city from database");
    }
}

export { getCities, singleCity, createCity, editCity, deleteCity };
