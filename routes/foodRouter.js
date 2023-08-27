import { Router } from "express";
import { getFoodList } from "../controller/foodListController.js";

const foodRouter = Router();

foodRouter.get("/", getFoodList);

export default foodRouter;
