import mongoose, { Model, Document } from "mongoose";
import { IUser } from "../declarations/model_declarations";

const Schema = mongoose.Schema;

export interface IUserModel extends IUser, Document {}

export const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
});

export const User: Model<IUserModel> = mongoose.model<IUserModel>(
	"User",
	UserSchema
);
