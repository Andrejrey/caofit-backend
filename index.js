import app from "./app.js";
import pool from "./db/client.js";
import cors from "cors";
import express from "express";

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.route("/foodlist").get(async (req, res) => {
  try {
    const { rows } =
      await pool.query(`SELECT FoodList.id as id, FoodList.name as name, image, icon, FoodCategory.name as category, quantity, FoodUnits.name as unit, carbs, fat, proteins, kcal
    FROM FoodList
    LEFT JOIN FoodCategory on FoodCategory.id = FoodList.category
    LEFT JOIN FoodUnits on FoodUnits.id = FoodList.unit;`);
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.route("/shopitems").get(async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, item_name, item_flavour, item_image, item_price, stock FROM ShopItems`
    );
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.route("/shopitems/:id").get(async (req, res) => {
  const itemId = req.params.id;
  try {
    const { rows } = await pool.query(
      `SELECT * FROM ShopItems WHERE ShopItems.id = $1`,
      [itemId]
    );
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.route("/total_nutritional_value").post(async (req, res) => {
  try {
    const { total_carbs, total_fats, total_proteins, total_kcal, date, day } =
      req.body;
    if (
      !total_carbs ||
      !total_fats ||
      !total_proteins ||
      !total_kcal ||
      !date ||
      !day
    )
      throw new Error("Invalid input", 400);
    const { rows } = await pool.query(
      "INSERT INTO Diary (total_carbs, total_fats, total_proteins, total_kcal, date, day) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ",
      [total_carbs, total_fats, total_proteins, total_kcal, date, day]
    );
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.route("/food_eaten").post(async (req, res) => {
  try {
    const {
      food_icon,
      food_name,
      food_quantity,
      food_unit,
      food_total_carbs,
      food_total_fats,
      food_total_proteins,
      food_total_kcal,
    } = req.body;
    if (
      !food_icon ||
      !food_name ||
      !food_quantity ||
      !food_unit ||
      !food_total_carbs ||
      !food_total_fats ||
      !food_total_proteins ||
      !food_total_kcal
    )
      throw new Error("Invalid input", 400);
    const { rows } = await pool.query(
      "INSERT INTO FoodEaten (food_icon, food_name, food_quantity, food_unit, food_total_carbs, food_total_fats, food_total_proteins, food_total_kcal) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * ",
      [
        food_icon,
        food_name,
        food_quantity,
        food_unit,
        food_total_carbs,
        food_total_fats,
        food_total_proteins,
        food_total_kcal,
      ]
    );
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
