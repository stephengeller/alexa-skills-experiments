const QuotePicker = require("../src/QuotePicker");

describe("QuotePicker", () => {
	let quotePicker;
	const chosenName = "Spongebob Squarepants";
	const db = {
		findOne: jest.fn()
	};

	beforeAll(() => {
		quotePicker = new QuotePicker(chosenName, db);
	});

	describe("instantiation", () => {
		test("Saves name in lowercase", () => {
			expect(quotePicker.name).toBe("spongebob squarepants");
		});
	});

	describe("getQuote", () => {
		test("", () => {
			quotePicker.getQuote();
			expect(db.findOne).toHaveBeenCalledWith("spongebob squarepants");
		});
	});
});
