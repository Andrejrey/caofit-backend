import pool from "../db/client.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getFoodList = async (req, res, next) => {
  try {
    const { rows } =
      await pool.query(`SELECT FoodList.id as id, FoodList.name as name, image, icon, FoodCategory.name as category, quantity, FoodUnits.name as unit, carbs, fat, proteins, kcal
    FROM FoodList
    LEFT JOIN FoodCategory on FoodCategory.id = FoodList.category
    LEFT JOIN FoodUnits on FoodUnits.id = FoodList.unit;`);
    return res.json(rows);
  } catch (error) {
    next(error);
  }
};
