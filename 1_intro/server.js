import express from "express";
import {
    createCity,
    editCity,
    getCities,
    singleCity,
    deleteCity,
} from "./database.js";

const app = express();

// Important Notes:
// 1. All endpoints are prefixed with /api/city
// 2. The API expects proper error handling and returns appropriate status codes
// 3. Database operations are asynchronous and use proper error handling
// 4. Input validation is handled in the database layer
// 5. The API follows RESTful conventions

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add JSON parsing middleware

// Get all cities
app.get("/api/city", async (req, res) => {
    try {
        const data = await getCities();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching cities:", error);
        res.status(500).json({ error: "Failed to fetch cities" });
    }
});

// Get single city by ID
app.get("/api/city/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const city = await singleCity(Number(id));

        if (!city) {
            return res.status(404).json({ error: "City not found" });
        }
        res.status(200).json(city);
    } catch (error) {
        console.error("Error fetching city:", error);
        res.status(500).json({ error: "Failed to fetch city" });
    }
});

// Create new city
app.post("/api/city", async (req, res) => {
    try {
        const { name, countrycode, district, population } = req.body;
        const addedResponse = await createCity(
            name,
            countrycode,
            district,
            Number(population)
        );
        res.status(201).json({ msg: "Success", id: addedResponse });
    } catch (error) {
        console.error("Error creating city:", error);
        res.status(500).json({ error: "Failed to create city" });
    }
});

// Update city
app.patch("/api/city/:id", async (req, res) => {
    try {
        const { data, colName } = req.body;
        const { id } = req.params;
        const editResponse = await editCity(colName, Number(id), data);

        if (!editResponse.affectedRows) {
            return res.status(404).json({ error: "City not found" });
        }
        res.status(200).json({ msg: "successful", data: editResponse });
    } catch (error) {
        console.error("Error updating city:", error);
        res.status(500).json({ error: "Failed to update city" });
    }
});

// Delete city
app.delete("/api/city/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteResponse = await deleteCity(Number(id));

        if (!deleteResponse.affectedRows) {
            return res.status(404).json({ error: "City not found" });
        }
        res.status(200).json({ msg: "City deleted successfully" });
    } catch (error) {
        console.error("Error deleting city:", error);
        res.status(500).json({ error: "Failed to delete city" });
    }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000... ");
});
