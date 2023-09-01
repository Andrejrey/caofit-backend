import pool from "../db/client.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const postFoodToDiary = async (req, res, next) => {
  try {
    const { userId } = req;
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
      total_carbs === null ||
      total_fats === null ||
      total_proteins === null ||
      total_kcal === null ||
      !date ||
      !day ||
      !food
    )
      throw new ErrorResponse("Invalid input", 400);
    const { rows } = await pool.query(
      "INSERT INTO Diary ( userid, total_carbs, total_fats, total_proteins, total_kcal, date, day) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [userId, total_carbs, total_fats, total_proteins, total_kcal, date, day]
    );
    const id = rows[0].id;
    let data;
    const promise = Promise.all(
      food.map(async (food) => {
        if (
          !id ||
          !food.foodIcon ||
          !food.name ||
          !food.quantity ||
          !food.unit ||
          food.totalFoodCarbs === null ||
          food.totalFoodFat === null ||
          food.totalFoodKcal === null ||
          food.totalFoodProteins === null
        )
          throw Error("Invalid input", 400);
        data = await pool.query(
          "INSERT INTO FoodEaten (diaryId, food_icon, food_name, food_quantity, food_unit, food_total_carbs, food_total_fats, food_total_proteins, food_total_kcal) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING * ",
          [
            id,
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
      })
    );
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
