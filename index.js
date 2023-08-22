import app from "./app.js";
import pool from "./db/client.js";
import cors from "cors";

const port = process.env.PORT || 8080;

app.use(cors());

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
