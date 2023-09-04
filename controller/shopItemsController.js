import pool from "../db/client.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getShopItemsList = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, item_name, item_flavour, item_image, item_price, stock FROM ShopItems`
    );
    return res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getShopItem = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const { rows } = await pool.query(`SELECT * FROM ShopItems WHERE id = $1`, [
      productId,
    ]);
    return res.json(rows);
  } catch (error) {
    next(error);
  }
};
