export enum Currency {
	SEK,
	DKK,
	EUR,
}

export const currencyToString = (currency: Currency) => {
	switch (currency) {
		case Currency.SEK:
			return "SEK";
		case Currency.DKK:
			return "DKK";
		case Currency.EUR:
			return "EUR";
	}
};

export const currencyFromString = (currency: string): Currency | undefined => {
	switch (currency) {
		case "SEK":
			return Currency.SEK;
		case "DKK":
			return Currency.DKK;
		case "EUR":
			return Currency.EUR;
		default:
			return undefined;
	}
};
