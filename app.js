import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import foodRouter from "./routes/foodRouter.js";
import shopItemsRouter from "./routes/shopItemsRouter.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use("/food_list", foodRouter);
app.use("/shop_items", shopItemsRouter);

app.use(errorHandler);

export default app;
