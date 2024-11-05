import DateShift from "../src/main";

describe("DateShift", () => {
	it("Initializes with today's date", () => {
		const date = new DateShift();
		const today = new Date();
		expect(date.year).toEqual(today.getFullYear());
		expect(date.month).toEqual(today.getMonth() + 1);
		expect(date.day).toEqual(today.getDate());
	});

	it("Initializes with a copy of another DateShift object", () => {
		const initialDate = new DateShift();
		const copiedDate = new DateShift(initialDate);
		expect(copiedDate).toEqual(initialDate);
	});

	it("Initializes with a copy of another Date object", () => {
		const dateObject = new Date(2024, 0, 1); // January 1, 2024
		const date = new DateShift(dateObject);
		expect(date.year).toBe(2024);
		expect(date.month).toBe(1);
		expect(date.day).toBe(1);
	});

	it("Initializes from a date string", () => {
		const dateString = "2024-01-02";
		const date = new DateShift(dateString);
		expect(date.year).toBe(2024);
		expect(date.month).toBe(1);
		expect(date.day).toBe(2);
	});

	it("Initializes from a date string without year", () => {
		const dateString = "01-02";
		const date = new DateShift(dateString);
		const today = new Date();
		expect(date.year).toBe(today.getFullYear());
		expect(date.month).toBe(1);
		expect(date.day).toBe(2);
	});

	it("Initializes from an invalid date string", () => {
		const invalidDateString = "hello-world";
		expect(() => {
			new DateShift(invalidDateString);
		}).toThrow("Invalid date string");
	});

	it("Initializes from year, month, and day numbers", () => {
		const date = new DateShift(2024, 1, 2);
		expect(date.year).toBe(2024);
		expect(date.month).toBe(1);
		expect(date.day).toBe(2);
	});

	it("Adds one day to the date - basic", () => {
		const date = new DateShift(2023, 1, 1);
		date.addDays(1);
		expect(date.year).toBe(2023);
		expect(date.month).toBe(1);
		expect(date.day).toBe(2);
	});

	it("Adds one day to the date - end of month", () => {
		const date = new DateShift(2023, 2, 28);
		date.addDays(1);
		expect(date.year).toBe(2023);
		expect(date.month).toBe(3);
		expect(date.day).toBe(1);
	});

	it("Adds one quarter to the date", () => {
		const date = new DateShift(2023, 1, 1);
		date.addDays(90);
		expect(date.year).toBe(2023);
		expect(date.month).toBe(4);
		expect(date.day).toBe(1);
	});

	it("Adds one year to the date", () => {
		const date = new DateShift(2023, 1, 1);
		date.addDays(365);
		expect(date.year).toBe(2024);
		expect(date.month).toBe(1);
		expect(date.day).toBe(1);
	});

	it("Adds decimal days to the date", () => {
		const date = new DateShift(2023, 1, 1);
		date.addDays(1.5);
		expect(date.year).toBe(2023);
		expect(date.month).toBe(1);
		expect(date.day).toBe(3);
	});

	it("Adds huge number of days to the date", () => {
		const date = new DateShift(2023, 1, 1);
		date.addDays(1_000_000);
		expect(date.year).toBe(4760);
		expect(date.month).toBe(11);
		expect(date.day).toBe(28);
	});

	it("Adds infinite days to the date", () => {
		const date = new DateShift(2023, 1, 1);
		expect(() => {
			date.addDays(Number.POSITIVE_INFINITY);
		}).toThrow("Too large");
		expect(() => {
			date.addDays(Number.NEGATIVE_INFINITY);
		}).toThrow("Too large");
	});

	it("Adds an invalid number of days", () => {
		const date = new DateShift();
		expect(() => {
			date.addDays(NaN);
		}).toThrow("Invalid argument");
	});

	it("Subtracts one day from the date - basic", () => {
		const date = new DateShift(2023, 1, 2);
		date.addDays(-1);
		expect(date.year).toBe(2023);
		expect(date.month).toBe(1);
		expect(date.day).toBe(1);
	});

	it("Subtracts one day from the date - beginning of month", () => {
		const date = new DateShift(2023, 1, 1);
		date.addDays(-1);
		expect(date.year).toBe(2022);
		expect(date.month).toBe(12);
		expect(date.day).toBe(31);
	});

	it("Subtracts one year from the date", () => {
		const date = new DateShift(2023, 1, 1);
		date.addDays(-365);
		expect(date.year).toBe(2022);
		expect(date.month).toBe(1);
		expect(date.day).toBe(1);
	});

	it("Checks if a year is a leap year", () => {
		const leapYearDate = new DateShift(2024, 1, 1);
		expect(leapYearDate.isLeapYear()).toBe(true);
		const nonLeapYearDate = new DateShift(2023, 1, 1);
		expect(nonLeapYearDate.isLeapYear()).toBe(false);
	});

	it("Returns the date as a Date object", () => {
		const date = new DateShift(2023, 4, 13);
		const dateObject = date.toDate();
		expect(dateObject.getFullYear()).toBe(2023);
		expect(dateObject.getMonth()).toBe(3);
		expect(dateObject.getDate()).toBe(13);
	});

	it("Returns the date as a string", () => {
		const date = new DateShift(2023, 4, 13);
		expect(date.toString()).toBe("20230413");
		expect(date.toString("-")).toBe("2023-04-13");
		expect(date.toString("/")).toBe("2023/04/13");
		expect(date.format("MM-DD")).toBe("04-13");
		expect(date.format("DD/MM/YYYY")).toBe("13/04/2023");
	});

	it("Compares dates", () => {
		const date1 = new DateShift(2023, 4, 13);
		const date2 = new DateShift(2023, 5, 15);
		const date3 = new DateShift(2023, 5, 15);
		expect(date1.compareTo(date2)).toBe(-1);
		expect(date1.equals(date2)).toBe(false);
		expect(date1.isBefore(date2)).toBe(true);
		expect(date1.isAfter(date2)).toBe(false);
		expect(date1 < date2).toBe(true);
		expect(date1 > date2).toBe(false);
		expect(date2.isBetween(date1, date3)).toBe(false);
		expect(date2.isBetweenInclusive(date1, date3)).toBe(true);
	});

	it("Calculates the days between two dates", () => {
		const date1 = new DateShift(2023, 4, 13);
		const date2 = new DateShift(2023, 5, 15);
		expect(date1.daysBetween(date2)).toBe(32);
	});
});
