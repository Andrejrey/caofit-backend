import app from "./app.js";
import pool from "./db/client.js";
import cors from "cors";
import express from "express";

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.route("/diary").get(async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM Diary`);
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.route("/food_eaten").get(async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM FoodEaten`);
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
