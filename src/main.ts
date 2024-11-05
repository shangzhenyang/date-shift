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
			const today = new Date();
			this.year = today.getFullYear();
			this.month = today.getMonth() + 1;
			this.day = today.getDate();
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
			const dateParts = mixed
				.split("-")
				.map((part) => parseInt(part))
				.filter((part) => !isNaN(part));
			if (dateParts.length !== 2 && dateParts.length !== 3) {
				throw new Error("Invalid date string");
			}
			if (dateParts.length === 2) {
				const today = new Date();
				this.year = today.getFullYear();
				this.month = dateParts[0];
				this.day = dateParts[1];
			} else {
				this.year = dateParts[0];
				this.month = dateParts[1];
				this.day = dateParts[2];
			}
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
		if (Math.abs(delta) > 1_000_000) {
			throw new Error("Too large");
		}
		if (delta === 0) {
			return this;
		}
		this.day += Math.round(delta);
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
				this.month--;
				if (this.month < 1) {
					this.year--;
					this.month = 12;
				}
				this.day += this.#getMaxDay(this.month);
			}
		}
		return this;
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

	public format(format: string): string {
		return format
			.replace("YYYY", this.year.toString())
			.replace("MM", this.month.toString().padStart(2, "0"))
			.replace("DD", this.day.toString().padStart(2, "0"));
	}

	#getMaxDay(month: number): number {
		if (month < 1 || month > 12) {
			throw new Error("Invalid month: " + month);
		}
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

	public isBetween(start: DateShift, end: DateShift): boolean {
		return this.isAfter(start) && this.isBefore(end);
	}

	public isBetweenInclusive(start: DateShift, end: DateShift): boolean {
		return (
			this.isBetween(start, end) || this.equals(start) || this.equals(end)
		);
	}

	public isLeapYear(): boolean {
		return (
			(this.year % 4 === 0 && this.year % 100 !== 0) ||
			this.year % 400 === 0
		);
	}

	public toDate(): Date {
		return new Date(this.year, this.month - 1, this.day);
	}

	public toString(separator = ""): string {
		return (
			this.year +
			separator +
			this.month.toString().padStart(2, "0") +
			separator +
			this.day.toString().padStart(2, "0")
		);
	}

	public valueOf(): number {
		return this.toDate().valueOf();
	}
}

export default DateShift;
