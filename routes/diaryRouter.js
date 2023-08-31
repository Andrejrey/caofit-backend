import { Router } from "express";
import { postFoodToDiary } from "../controller/diaryController.js";
import { protect } from "../middlewares/auth.js";

const diaryRouter = Router();

diaryRouter.post("/save_to_diary", protect, postFoodToDiary);

export default diaryRouter;
