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

app.route("/get_user_diary").get(async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT
        Diary.id,
        Diary.userId,
        Diary.total_carbs,
        Diary.total_fats,
        Diary.total_proteins,
        Diary.total_kcal,
        Diary.date,
        Diary.day,
        (
          SELECT json_agg(json_build_object('id', FoodEaten.id, 'food_name', FoodEaten.food_name, 'food_icon', FoodEaten.food_icon, 'food_quantity', FoodEaten.food_quantity, 'food_unit', FoodEaten.food_unit, 'food_total_carbs', FoodEaten.food_total_carbs, 'food_total_fats', FoodEaten.food_total_fats, 'food_total_proteins', FoodEaten.food_total_proteins, 'food_total_kcal', FoodEaten.food_total_kcal))
          FROM FoodEaten
    WHERE FoodEaten.diaryId = Diary.id
  ) AS food
      FROM Diary
      WHERE Diary.userId = 1`
    );
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
