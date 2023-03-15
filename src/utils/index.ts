import { Currency } from "../declarations/currency";
import { IItem } from "../declarations/model_declarations";
import { IItemModel } from "../models/item";

const CONVERSION_RATES = {
	SEK: {
		EUR: 0.1,
		DKK: 0.7,
		SEK: 1,
	},
	EUR: {
		SEK: 1 / 0.1,
		DKK: 1 / 0.13,
		EUR: 1,
	},
	DKK: {
		SEK: 1 / 0.7,
		EUR: 0.13,
		DKK: 1,
	},
};

type ConvertObject = {
	value: number;
	currency: Currency;
};

export const convert =
	(convertObject: ConvertObject) => (toCurrency: Currency) => {
		if (convertObject.value === undefined || convertObject.currency === undefined)
			throw new Error("value and currency is required for conversion");
		const rate = CONVERSION_RATES[convertObject.currency][toCurrency];
		if (!rate) throw new Error("Non-supported currency");
		return {
			value: Math.round(convertObject.value * rate * 100) / 100,
			currency: toCurrency,
		};
	};

export const checkBody = (body: object, keys: string[]) => {
	return keys.every((key) => Object.keys(body).includes(key));
};

export const itemsWithConvertedPrices = (
	items: IItemModel[],
	currency: Currency
): (IItem & { price: number })[] => {
	return items.map((item) => ({
		...item.toJSON(),
		price: convert({
			value: item.ownerPrices[item.ownerPrices.length - 1],
			currency: item.currency as Currency,
		})(currency).value,
	}));
};
