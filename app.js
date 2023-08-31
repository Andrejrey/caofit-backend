import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRouter.js";
import foodRouter from "./routes/foodRouter.js";
import shopItemsRouter from "./routes/shopItemsRouter.js";
import diaryRouter from "./routes/diaryRouter.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/food_list", foodRouter);
app.use("/shop_items", shopItemsRouter);
app.use("/diary", diaryRouter);

app.use(errorHandler);

export default app;
