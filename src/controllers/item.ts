import { NextFunction, Request, Response } from "express";
import { CustomError } from "../declarations/custom_error";
import { IItem } from "../declarations/model_declarations";
import { Item } from "../models/item";
import { User } from "../models/user";
import { checkBody, itemsWithConvertedPrices } from "../utils";
import mongoose from "mongoose";
import { checkCurrency, Currency } from "../declarations/currency";

export const allItems = (req: Request, res: Response, next: NextFunction) => {
	Item.find({ soldPrice: null })
		.then((result) => {
			if (!req.query.currency || !checkCurrency(req.query.currency as string)) {
				const newError = new CustomError(
					`No conversion for currency ${req.query.currency} exists!`,
					400
				);
				return next(newError);
			}

			const formattedItems = itemsWithConvertedPrices(
				result,
				req.query.currency as Currency
			);

			return res.status(200).json(formattedItems);
		})
		.catch((error: Error) => {
			const newError = new CustomError(
				`Could not retrieve items: ${error.message}`,
				500
			);
			return next(newError);
		});
};

export const createItem = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const ok = checkBody(req.body, [
		"description",
		"images",
		"owner",
		"price",
		"currency",
	]);
	if (!ok) {
		const newError = new CustomError("Invalid body.", 400);
		return next(newError);
	}

	const owner = await User.findOne({ username: req.body.owner });
	if (!owner) {
		const newError = new CustomError("Owner does not exist.", 400);
		return next(newError);
	}

	const newItem: IItem = {
		description: req.body.description,
		images: req.body.images,
		owner: new mongoose.Types.ObjectId(owner.id),
		ownerPrices: [req.body.price],
		currency: req.body.currency,
	};

	try {
		const resultItem = await Item.create(newItem);
		return res.status(200).json(resultItem);
	} catch (error: any) {
		const newError = new CustomError(
			`Could not save item: ${error.message}`,
			500
		);
		return next(newError);
	}
};

export const myItems = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.query.username === undefined) {
		return res.status(200).json([]);
	}

	const owner = await User.findOne({ username: req.query.username });
	if (!owner) {
		const newError = new CustomError("Owner does not exist.", 400);
		return next(newError);
	}

	Item.find({ owner: owner.id })
		.then((result) => {
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

export const updateItemPrice = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const item = await Item.findById(req.params.itemId);

		const ok = checkBody(req.body, ["price"]);
		if (!ok) {
			const newError = new CustomError("Invalid body.", 400);
			return next(newError);
		}

		item!.ownerPrices.push(req.body.price);

		const updatedItem = await item!.save();

		return res.status(200).json(updatedItem);
	} catch (error) {
		const newError = new CustomError(`Item does not exist!`, 404);
		return next(newError);
	}
};

export const itemPriceHistory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const item = await Item.findById(req.params.itemId);
		return res.status(200).json(item!.ownerPrices);
	} catch (error) {
		const newError = new CustomError(`Item does not exist!`, 404);
		return next(newError);
	}
};
