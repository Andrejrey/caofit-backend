import app from "./app.js";
import cors from "cors";
import express from "express";

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
