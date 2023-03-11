import { NextFunction, Request, Response } from "express";
import { CustomError } from "../declarations/custom_error";
import { IItem } from "../declarations/model_declarations";
import { Item } from "../models/item";

export const allItemsController = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Item.find({})
		.then((result: Array<IItem>) => {
			return res.status(200).json(result);
		})
		.catch((error: Error) => {
			const newError = new CustomError(
				`Could not retrieve items: ${error.message}`,
				500
			);
			return next(newError);
		});
};
