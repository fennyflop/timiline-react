export default class DateValidator {
    // constructor(day, month, year) {
    //     this._day = day;
    //     this._month = month;
    //     this._year = year;
    // }
    // inputsValid(day, month, year) {
    //     if (this._month > 12 || this._day > 31 || this._day < 1 || this._month < 1) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }
    _isLeapYear(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }
    isDateValid(day, month, year) {
        if (month <= 7 && month !== 2) {
            if (month % 2 === 0 && day <= 30) {
                return true;
            } else if (month % 2 !== 0 && day <= 31) {
                return true;
            } else {
                return false;
            }
        } else if (month >= 8) {
            if (month % 2 === 0 && day <= 31) {
                return true;
            } else if (month % 2 !== 0 && day <= 30) {
                return true;
            } else {
                return false;
            }
        } else {
            if (this._isLeapYear(year) && day <= 29) {
                return true;
            } else if (!this._isLeapYear(year) && day <= 28) {
                return true;
            } else {
                return false;
            }
        }
    }
}