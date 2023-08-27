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

app.route("/save_to_diary").post(async (req, res) => {
  try {
    const {
      total_carbs,
      total_fats,
      total_proteins,
      total_kcal,
      date,
      day,
      food,
    } = req.body;

    if (
      !total_carbs ||
      !total_fats ||
      !total_proteins ||
      !total_kcal ||
      !date ||
      !day ||
      !food
    )
      throw new Error("Invalid input", 400);
    const { rows } = await pool.query(
      "INSERT INTO Diary (total_carbs, total_fats, total_proteins, total_kcal, date, day) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ",
      [total_carbs, total_fats, total_proteins, total_kcal, date, day]
    );

    const promise = food.map(async (food) => {
      console.log(food);
      if (
        !food.foodIcon ||
        !food.name ||
        !food.quantity ||
        !food.unit ||
        !food.totalFoodCarbs ||
        !food.totalFoodFat ||
        !food.totalFoodKcal ||
        !food.totalFoodProteins
      )
        throw Error("Invalid input", 400);
      const { rows } = await pool.query(
        "INSERT INTO FoodEaten (food_icon, food_name, food_quantity, food_unit, food_total_carbs, food_total_fats, food_total_proteins, food_total_kcal) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * ",
        [
          food.foodIcon,
          food.name,
          food.quantity,
          food.unit,
          food.totalFoodCarbs,
          food.totalFoodFat,
          food.totalFoodProteins,
          food.totalFoodKcal,
        ]
      );
      console.log(rows);
    });

    console.log(rows);
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
