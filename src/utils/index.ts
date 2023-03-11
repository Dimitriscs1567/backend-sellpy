import { Currency, currencyToString } from "../declarations/currency";

const CONVERSION_RATES = {
	SEK: {
		EUR: 0.1,
		DKK: 0.7,
	},
	EUR: {
		SEK: 1 / 0.1,
		DKK: 1 / 0.13,
	},
	DKK: {
		SEK: 1 / 0.7,
		EUR: 0.13,
	},
};

type ConvertObject = {
	value?: number;
	currency?: Currency;
};

export const convert =
	(convertObject: ConvertObject) => (toCurrency: Currency) => {
		if (!convertObject.value || !convertObject.currency)
			throw new Error("value and currency is required for conversion");
		const rate =
			CONVERSION_RATES[currencyToString(convertObject.currency!)][
				currencyToString(toCurrency)
			];
		if (!rate) throw new Error("Non-supported currency");
		return {
			value: Math.round(convertObject.value * rate * 100) / 100,
			currency: toCurrency,
		};
	};
