import express from "express";
import {
	addItemToCart,
	allItems,
	removeItemFromCart,
} from "../controllers/cart";

const router = express.Router();

router.post("/:username/add", addItemToCart);
router.post("/:username/remove", removeItemFromCart);
router.get("/:username/all_items", allItems);

export default router;
