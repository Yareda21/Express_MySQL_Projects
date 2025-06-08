import express from "express";
import { getCities } from "./database.js";

const app = express();

app.get("/", async (req, res) => {
    const data = await getCities();

    if (!data) {
        console.log("Database is not responsive!");
        return;
    }
    res.status(201).json(data);
});
