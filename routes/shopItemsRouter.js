import { Router } from "express";
import {
  getShopItem,
  getShopItemsList,
} from "../controller/shopItemsController.js";
import { checkShopItem } from "../middlewares/checkShopItem.js";

const shopItemsRouter = Router();

shopItemsRouter.get("/", getShopItemsList);
shopItemsRouter.get("/:id", checkShopItem, getShopItem);

export default shopItemsRouter;
