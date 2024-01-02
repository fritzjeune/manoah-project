
const getListDateFromRange = (date, amortNumber) => {
    const aDay = 24 * 60 * 60 * 1000;
    const pad = num => ("0" + num).slice(-2);

    const formatDate = d => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());

    const getRange = range => {
        let ranges = [];

        console.log("start", range.start, "end", range.end)

        for (var i = range.start.getTime(), end = range.end.getTime(); i <= end;) {
            var first = new Date(i), last = new Date(first.getFullYear(), first.getMonth() + 1, 0); // last day of the month
            ranges.push(
                // {
                // start: `${formatDate(first)}`,
                // end: `${formatDate(last)}`
                // }
                formatDate(first)
            )
            i = last.getTime() + aDay;
            // if (!confirm(formatDate(new Date(i)))) break
        }
        return ranges;
    }
    
    const start = new Date(date.replace(/-/g, '\/'))

    const newStart = new Date(date.replace(/-/g, '\/'))

    let range = { // your range
        // start: new Date(2019, 0, 1, 15, 0, 0, 0), // remember month is 0 based
        // end: new Date(2020, 0, 1, 15, 0, 0, 0) // use 15:00 to help DST and Timzones yesterday
        start: new Date(newStart.setMonth(start.getMonth() + 1)),
        end: new Date(newStart.setMonth(start.getMonth() + amortNumber))
    };
    console.log(amortNumber)
    console.log(getRange(range))
    return getRange(range)
}


module.exports = {
    getListDateFromRange
}