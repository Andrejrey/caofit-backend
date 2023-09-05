import { Router } from "express";
import {
  postFoodToDiary,
  getUserDiary,
  deleteDiaryById,
} from "../controller/diaryController.js";
import { protect } from "../middlewares/auth.js";

const diaryRouter = Router();

diaryRouter.post("/save_to_diary", protect, postFoodToDiary);
diaryRouter.get("/get_user_diary", protect, getUserDiary);
diaryRouter.delete("/delete_user_diary/:id", protect, deleteDiaryById);

export default diaryRouter;
