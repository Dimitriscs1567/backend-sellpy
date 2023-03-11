import mongoose from "mongoose";

export interface IItem {
	description: string;
	images: Array<string>;
	owner: mongoose.Types.ObjectId;
	ownerPrices: Array<number>;
	soldPrice?: number;
	currency: string;
	buyer?: mongoose.Types.ObjectId;
	cart?: mongoose.Types.ObjectId;
}

export interface IUser {
	username: string;
}

export interface ICart {
	buyer: mongoose.Types.ObjectId;
}
