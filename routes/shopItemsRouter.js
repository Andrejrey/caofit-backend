import { Router } from "express";
import {
  getShopItem,
  getShopItemsList,
} from "../controller/shopItemsController.js";
import { checkShopItem } from "../middlewares/checkShopItem.js";
import { noIndex } from "../middlewares/noIndex.js";

const shopItemsRouter = Router();

shopItemsRouter.get("/", noIndex, getShopItemsList);
shopItemsRouter.get("/:id", noIndex, checkShopItem, getShopItem);

export default shopItemsRouter;
