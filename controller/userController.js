import pool from "../db/client.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { createJWT, hashPassword, comparePasswords } from "../utils/auth.js";

export const getUsers = async (req, res, next) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM Users`);
    return res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const signUp = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password)
      throw new ErrorResponse("Invalid input", 400);
    const found = await pool.query("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);
    if (found.rows.length > 0)
      throw new ErrorResponse("User already exists", 400);
    const hash = await hashPassword(password);
    const { rows } = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email",
      [first_name, last_name, email, hash]
    );
    const token = createJWT(rows[0].id);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const found = await pool.query("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);
    if (found.rows.length === 0)
      throw new ErrorResponse("User doesn't exists!", 400);
    const isValid = await comparePasswords(password, found.rows[0].password);
    if (!isValid) throw new ErrorResponse("Incorrect password", 401);
    const token = createJWT(found.rows[0].id);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const getUser = asyncHandler(async (req, res) => {
  const { userId } = req;
  const found = await pool.query("SELECT * FROM Users WHERE id = $1", [userId]);
  if (found.rows.length === 0)
    throw new ErrorResponse("User doesn't exists!", 400);
  res.status(201).json(found.rows[0]);
});
