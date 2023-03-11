import mongoose, { Model, Document } from "mongoose";
import { IItem } from "../declarations/model_declarations";

const Schema = mongoose.Schema;

export interface IItemModel extends IItem, Document {}

export const ItemSchema = new Schema({
	description: {
		type: String,
		required: true,
	},
	images: {
		type: Array,
		required: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	ownerPrices: {
		type: Array,
		required: true,
	},
	soldPrice: {
		type: Number,
		required: false,
	},
	buyer: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: false,
	},
	currency: {
		type: String,
		required: true,
	},
	cart: {
		type: Schema.Types.ObjectId,
		ref: "Cart",
		required: false,
	},
});

export const Item: Model<IItemModel> = mongoose.model<IItemModel>(
	"Item",
	ItemSchema
);
