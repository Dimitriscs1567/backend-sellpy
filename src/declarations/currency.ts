export enum Currency {
	SEK = "SEK",
	DKK = "DKK",
	EUR = "EUR",
}

export const checkCurrency = (currency: string) => {
	return currency === "SEK" || currency === "DKK" || currency === "EUR";
};
