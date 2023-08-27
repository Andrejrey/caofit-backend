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
  try {
    return res.json(req.shopItem);
  } catch (error) {
    next(error);
  }
};
