export interface IItem {
	description: string;
	images: Array<string>;
	owner: IUser;
	ownerPrices: Array<number>;
	soldPrice: number;
	currency: string;
	buyer: IUser;
	cart: ICart;
}

export interface IUser {
	username: string;
}

export interface ICart {
	buyer: IUser;
}
