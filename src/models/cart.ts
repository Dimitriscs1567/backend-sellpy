import mongoose, { Model, Document } from "mongoose";
import { ICart } from "../declarations/model_declarations";

const Schema = mongoose.Schema;

export interface ICartModel extends ICart, Document {}

export const CartSchema = new Schema({
	buyer: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

export const Cart: Model<ICartModel> = mongoose.model<ICartModel>(
	"Cart",
	CartSchema
);
