class DateShift {
	public year: number;
	public month: number;
	public day: number;

	public constructor();
	public constructor(another: DateShift);
	public constructor(date: Date);
	public constructor(dateString: string);
	public constructor(year: number, month: number, day: number);

	public constructor(
		mixed?: DateShift | Date | string | number,
		month?: number,
		day?: number,
	) {
		if (arguments.length === 0) {
			const dateObj = new Date();
			this.year = dateObj.getFullYear();
			this.month = dateObj.getMonth() + 1;
			this.day = dateObj.getDate();
		} else if (
			arguments.length === 3 &&
			typeof mixed === "number" &&
			typeof month === "number" &&
			typeof day === "number"
		) {
			this.year = mixed;
			this.month = month;
			this.day = day;
		} else if (
			arguments.length === 1 &&
			typeof mixed === "string" &&
			mixed.includes("-")
		) {
			const dateSplit = mixed.split("-");
			this.year = parseInt(dateSplit[0]);
			this.month = parseInt(dateSplit[1]);
			this.day = parseInt(dateSplit[2]);
		} else if (arguments.length === 1 && mixed instanceof DateShift) {
			this.year = mixed.year;
			this.month = mixed.month;
			this.day = mixed.day;
		} else if (arguments.length === 1 && mixed instanceof Date) {
			this.year = mixed.getFullYear();
			this.month = mixed.getMonth() + 1;
			this.day = mixed.getDate();
		} else {
			throw new Error("Invalid arguments");
		}
	}

	public addDays(delta: number): DateShift {
		if (isNaN(delta)) {
			throw new Error("Invalid argument");
		}
		if (delta === 0) {
			return this;
		}
		this.day += delta;
		while (this.day > this.#getMaxDay(this.month) || this.day < 1) {
			const thisMonthMaxDay = this.#getMaxDay(this.month);
			if (this.day > thisMonthMaxDay) {
				this.month++;
				if (this.month > 12) {
					this.year++;
					this.month = 1;
				}
				this.day -= thisMonthMaxDay;
			} else if (this.day < 1) {
				const lastMonthMaxDay = this.#getMaxDay(this.month - 1);
				this.month--;
				if (this.month < 1) {
					this.year--;
					this.month = 12;
				}
				this.day += lastMonthMaxDay;
			}
		}
		return this;
	}

	static #addZero(num: string, length: number): string {
		return (Array(length).join("0") + (num || "0")).slice(-length);
	}

	public compareTo(another: DateShift): 0 | 1 | -1 {
		if (!(another instanceof DateShift)) {
			throw new Error("Invalid argument");
		}
		if (this.year !== another.year) {
			return this.year > another.year ? 1 : -1;
		} else if (this.month !== another.month) {
			return this.month > another.month ? 1 : -1;
		} else if (this.day !== another.day) {
			return this.day > another.day ? 1 : -1;
		}
		return 0;
	}

	public daysBetween(another: DateShift): number {
		if (!(another instanceof DateShift)) {
			throw new Error("Invalid argument");
		}
		const thisDate = this.toDate();
		const anotherDate = another.toDate();
		const diffTime = Math.abs(thisDate.getTime() - anotherDate.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	}

	public equals(another: DateShift): boolean {
		return this.compareTo(another) === 0;
	}

	#getMaxDay(month: number): number {
		const maxDay = [
			31, // January
			this.isLeapYear() ? 29 : 28, // February
			31, // March
			30, // April
			31, // May
			30, // June
			31, // July
			31, // August
			30, // September
			31, // October
			30, // November
			31, // December
		];
		return maxDay[month - 1];
	}

	public isAfter(another: DateShift): boolean {
		return this.compareTo(another) > 0;
	}

	public isBefore(another: DateShift): boolean {
		return this.compareTo(another) < 0;
	}

	public isLeapYear(): boolean {
		return (this.year % 4 === 0 && this.year % 100 !== 0) ||
			(this.year % 400 === 0);
	}

	public toDate(): Date {
		return new Date(this.year, this.month - 1, this.day);
	}

	public toString(separator = ""): string {
		return this.year + separator +
			DateShift.#addZero(this.month.toString(), 2) + separator +
			DateShift.#addZero(this.day.toString(), 2);
	}
}

export default DateShift;
