import express from "express";
import { allItemsController } from "../controllers/item";

const router = express.Router();

router.get("/all_items", allItemsController);

export default router;
