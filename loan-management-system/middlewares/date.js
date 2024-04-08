function leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

const pad = num => ("0" + num).slice(-2);
const formatDate = d =>d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());

const addMonthToDate = (date, amount) => {
    function monthDiff(from, to) {
        const years = to.getFullYear() - from.getFullYear();
        const months = to.getMonth() - from.getMonth();
        return 12 * years + months;
    }

    function addMonths(date, amount) {
        const endDate = new Date(date.getTime());
        const originalTimeZoneOffset = endDate.getTimezoneOffset();
        endDate.setMonth(endDate.getMonth() + amount);
        while (monthDiff(date, endDate) > amount) {
            endDate.setDate(endDate.getDate() - 1);
        }
        const endTimeZoneOffset = endDate.getTimezoneOffset();
        const diff = endTimeZoneOffset - originalTimeZoneOffset;
        const finalDate = diff ? endDate.setMinutes(endDate.getMinutes() - diff) : endDate;
        return new Date(finalDate);
    }

    return addMonths(date, amount)
}

const getListDateFromRange = (date, amortNumber, method="m") => {
    console.log(date)
    let ranges = [];
    const start = new Date(date.replace(/-/g, '\/'))

    for (var i = 1; i <= amortNumber; i++) {
        if (method == 'w') {
            var first = new Date(start)
            ranges.push(formatDate(new Date(first.getFullYear(), first.getMonth() , first.getDate() + (7 * i))))
        } else if (method == 'b') {
            var first = new Date(start)
            ranges.push(formatDate(new Date(first.getFullYear(), first.getMonth() , first.getDate() + (14 * i))))
        } else {
            ranges.push(formatDate(addMonthToDate(start, i)))
        }
    }
    console.log(ranges)
    return ranges;
}

const generateCaseNumber = (numb=0) => {
    let numLen = numb.toString().length
    let code = `${"0".repeat(7 - numLen)}${numb}`
    return code
}

module.exports = {
    getListDateFromRange,
    generateCaseNumber,
    formatDate
}