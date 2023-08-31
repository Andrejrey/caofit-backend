import { Router } from "express";
import {
  signIn,
  signUp,
  getUsers,
  getUser,
} from "../controller/userController.js";
import { protect } from "../middlewares/auth.js";
import validateJOI from "../middlewares/validateJOI.js";
import { signupSchema, signinSchema } from "../joi/schemas.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/signup", validateJOI(signupSchema), signUp);
userRouter.post("/signin", validateJOI(signinSchema), signIn);
userRouter.get("/me", protect, getUser);

export default userRouter;
