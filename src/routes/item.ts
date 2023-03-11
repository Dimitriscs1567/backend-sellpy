import express from "express";
import {
	allItems,
	createItem,
	myItems,
	updateItemPrice,
	itemPriceHistory,
} from "../controllers/item";

const router = express.Router();

router.get("/all_items", allItems);
router.post("/all_items", createItem);
router.get("/my_items", myItems);
router.patch("/:itemId", updateItemPrice);
router.get("/:itemId/price_history", itemPriceHistory);

export default router;
