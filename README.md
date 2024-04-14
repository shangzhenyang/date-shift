# date-shift

A simple JavaScript library for date manipulation and comparison.

## Installation

```bash
npm install date-shift
```

## Usage

### Initialization

```javascript
import DateShift from "date-shift";

// Default constructor: uses the current date
const today = new DateShift();

// Copy constructor
const todayCopy = new DateShift(today);

// Constructs from a Date object
const dateFromObject = new DateShift(new Date());

// Constructs from a string
const dateFromString = new DateShift("2024-01-01");

// Constructs from year, month, and day numbers
const dateFromNumbers = new DateShift(2024, 1, 1);
```

### Add Days

The `addDays` method will change the field values of the current object and
return the object itself.

```javascript
const tomorrow = new DateShift().addDays(1);
const yesterday = new DateShift().addDays(-1);
const nextWeek = new DateShift().addDays(7);
```

### List Dates for the Next 30 Days Starting Today

```javascript
for (let i = 0; i < 30; i++) {
	const date = new DateShift().addDays(i);
	console.log(date.toString());
}
```

### Compare Dates

```javascript
const date1 = new DateShift(2023, 4, 13);
const date2 = new DateShift(2023, 5, 15);
console.log(date1.compareTo(date2)); // -1 (date1 is earlier than date2)
console.log(date1.equals(date2)); // false
console.log(date1.isBefore(date2)); // true
console.log(date1.isAfter(date2)); // false
```

### Calculate Days Between Dates

```javascript
const date1 = new DateShift(2023, 4, 13);
const date2 = new DateShift(2023, 5, 15);
console.log(date1.daysBetween(date2)); // 32
```

### Leap Year Check

```javascript
const date = new DateShift(2024, 1, 1);
console.log(date.isLeapYear()); // true
```

### Get Values

```javascript
const date = new DateShift(2023, 4, 13);
console.log(date.year); // 2023
console.log(date.month); // 4
console.log(date.day); // 13
```

### Return Date as String

```javascript
const date = new DateShift(2023, 4, 13);
console.log(date.toString()); // "20230413"
console.log(date.toString("-")); // "2023-04-13"
console.log(date.toString("/")); // "2023/04/13"
```

## License

[MIT](LICENSE).
