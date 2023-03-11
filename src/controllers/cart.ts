import { NextFunction, Request, Response } from "express";
import { currencyFromString } from "../declarations/currency";
import { CustomError } from "../declarations/custom_error";
import { Cart } from "../models/cart";
import { Item } from "../models/item";
import { User } from "../models/user";
import { checkBody, itemsWithConvertedPrices } from "../utils";

export const addItemToCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const buyer = await User.findOne({ username: req.params.username });
	if (!buyer) {
		const newError = new CustomError("Buyer does not exist.", 404);
		return next(newError);
	}

	const ok = checkBody(req.body, ["itemId"]);
	if (!ok) {
		const newError = new CustomError("Invalid body.", 400);
		return next(newError);
	}

	let cart = await Cart.findOne({ buyer: buyer.id });
	if (!cart) {
		cart = await Cart.create({ buyer: buyer.id });
	}

	const item = await Item.findOne({ _id: req.body.itemId });
	if (!item) {
		const newError = new CustomError("Item does not exist.", 400);
		return next(newError);
	}
	if (item.cart) {
		const newError = new CustomError("Item already in cart.", 400);
		return next(newError);
	}

	item.cart = cart.id;

	item.save();

	return res.status(200).json();
};

export const removeItemFromCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const buyer = await User.findOne({ username: req.params.username });
	if (!buyer) {
		const newError = new CustomError("Buyer does not exist.", 404);
		return next(newError);
	}

	const ok = checkBody(req.body, ["itemId"]);
	if (!ok) {
		const newError = new CustomError("Invalid body.", 400);
		return next(newError);
	}

	const cart = await Cart.findOne({ buyer: buyer.id });
	if (!cart) {
		const newError = new CustomError("Cart does not exist.", 404);
		return next(newError);
	}

	const item = await Item.findOne({ _id: req.body.itemId });
	if (!item) {
		const newError = new CustomError("Item does not exist.", 400);
		return next(newError);
	}

	if (!item.cart || item.cart._id.toString() !== cart.id) {
		const newError = new CustomError("Item not in cart.", 400);
		return next(newError);
	}

	item.cart = undefined;

	item.save();

	return res.status(200).json();
};

export const allItems = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const buyer = await User.findOne({ username: req.params.username });
	if (!buyer) {
		const newError = new CustomError("Buyer does not exist.", 404);
		return next(newError);
	}

	const cart = await Cart.findOne({ buyer: buyer.id });
	if (!cart) {
		return res.status(200).json({ items: [], totalPrice: 0 });
	}

	if (
		!req.query.currency ||
		currencyFromString(req.query.currency as string) === undefined
	) {
		const newError = new CustomError(
			`No conversion for currency ${req.query.currency} exists!`,
			400
		);
		return next(newError);
	}

	const allCartItems = await Item.find({ cart: cart.id });
	const convertedCartItems = itemsWithConvertedPrices(
		allCartItems,
		currencyFromString(req.query.currency as string)!
	);

	return res.status(200).json({
		items: convertedCartItems,
		totalPrice: convertedCartItems.reduce(
			(a: any, b: any) => a.price + b.price,
			0
		),
	});
};
