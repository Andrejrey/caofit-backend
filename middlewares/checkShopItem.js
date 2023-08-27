import pool from "../db/client.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const checkShopItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT * FROM ShopItems WHERE ShopItems.id = $1`,
      [id]
    );
    if (!rows.length > 0) throw new ErrorResponse("Item not found", 400);
    req.shopItem = rows[0];
    next();
  } catch (error) {
    next(error);
  }
};
