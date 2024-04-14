import DateShift from "../src/main";

describe("DateShift", () => {
	it("Initializes with today's date", () => {
		const today = new Date();
		const dateShiftToday = new DateShift();
		expect(dateShiftToday.year).toEqual(today.getFullYear());
		expect(dateShiftToday.month).toEqual(today.getMonth() + 1);
		expect(dateShiftToday.day).toEqual(today.getDate());
	});

	it("Initializes with a copy of another DateShift object", () => {
		const initialDate = new DateShift();
		const copiedDate = new DateShift(initialDate);
		expect(copiedDate).toEqual(initialDate);
	});

	it("Initializes with a copy of another Date object", () => {
		const date = new Date(2024, 0, 1); // January 1, 2024
		const dateShiftFromObject = new DateShift(date);
		expect(dateShiftFromObject.year).toBe(2024);
		expect(dateShiftFromObject.month).toBe(1);
		expect(dateShiftFromObject.day).toBe(1);
	});

	it("Initializes from a date string", () => {
		const dateString = "2024-01-01";
		const dateFromString = new DateShift(dateString);
		expect(dateFromString.year).toBe(2024);
		expect(dateFromString.month).toBe(1);
		expect(dateFromString.day).toBe(1);
	});

	it("Initializes from year, month, and day numbers", () => {
		const dateFromNumbers = new DateShift(2024, 1, 1);
		expect(dateFromNumbers.year).toBe(2024);
		expect(dateFromNumbers.month).toBe(1);
		expect(dateFromNumbers.day).toBe(1);
	});

	it("Adds one day to the date", () => {
		const today = new DateShift();
		const sameTodayRef = today.addDays(1);
		expect(sameTodayRef).toBe(today);
		expect(today.day).toBe(new Date().getDate() + 1);
	});

	it("Adds one quarter to the date", () => {
		const today = new DateShift(2023, 1, 1);
		today.addDays(90);
		expect(today.year).toBe(2023);
		expect(today.month).toBe(4);
		expect(today.day).toBe(1);
	});

	it("Adds one year to the date", () => {
		const today = new DateShift(2023, 1, 1);
		today.addDays(365);
		expect(today.year).toBe(2024);
		expect(today.month).toBe(1);
		expect(today.day).toBe(1);
	});

	it("Checks if a year is a leap year", () => {
		const leapYearDate = new DateShift(2024, 1, 1);
		expect(leapYearDate.isLeapYear()).toBe(true);
		const nonLeapYearDate = new DateShift(2023, 1, 1);
		expect(nonLeapYearDate.isLeapYear()).toBe(false);
	});

	it("Returns the date as a string", () => {
		const date = new DateShift(2023, 4, 13);
		expect(date.toString()).toBe("20230413");
		expect(date.toString("-")).toBe("2023-04-13");
		expect(date.toString("/")).toBe("2023/04/13");
	});

	it("Compares two dates", () => {
		const date1 = new DateShift(2023, 4, 13);
		const date2 = new DateShift(2023, 5, 15);
		expect(date1.compareTo(date2)).toBe(-1);
		expect(date1.equals(date2)).toBe(false);
		expect(date1.isBefore(date2)).toBe(true);
		expect(date1.isAfter(date2)).toBe(false);
	});

	it("Calculates the days between two dates", () => {
		const date1 = new DateShift(2023, 4, 13);
		const date2 = new DateShift(2023, 5, 15);
		expect(date1.daysBetween(date2)).toBe(32);
	});
});
