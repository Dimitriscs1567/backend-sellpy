import { NextFunction, Request, Response } from "express";
import { CustomError } from "../declarations/custom_error";

export const handleErrors = (
	error: CustomError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return res.status(error.statusCode).json({
		error: error.message,
	});
};
