

const getListDateFromRange = (date, amortNumber, method) => {
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

const getListDateFromRangeWeekly = (date, amortNumber, method) => {
    const aDay = 24 * 60 * 60 * 1000;
    const pad = num => ("0" + num).slice(-2);

    const formatDate = d => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());

    const getRange = range => {
        let ranges = [];

        console.log("start", range.start, "end", range.end)

        for (var i = range.start.getTime(), end = range.end.getTime(); i <= end;) {
            var first = new Date(i)
            var last = new Date()
            if (method && method == 'w') {
                last = new Date(first.getFullYear(), first.getMonth() , first.getDate() + 7); // last day of the week
            } else {
                last = new Date(first.getFullYear(), first.getMonth() + 1, 0); // last day of the month
            }
            
            ranges.push(
                // {
                // start: `${formatDate(first)}`,
                // end: `${formatDate(last)}`
                // }
                formatDate(first)
            )
            i = last.getTime();
            // if (!confirm(formatDate(new Date(i)))) break
        }
        return ranges;
    }
    
    const start = new Date(date.replace(/-/g, '\/'))

    const newStart = new Date(date.replace(/-/g, '\/'))


    let range;
    if (method && method == 'w') {
        range = { 
            start: new Date(newStart.setDate(start.getDate() + 7)),
            end: new Date(newStart.setDate(start.getDate() + (amortNumber * 7)))
        };
    } else {
        range = { 
            start: new Date(newStart.setMonth(start.getMonth() + 1)),
            end: new Date(newStart.setMonth(start.getMonth() + amortNumber))
        };
    }
    
    
    console.log(range)
    console.log(getRange(range))
    return getRange(range)
}

getListDateFromRangeWeekly('2024-01-01', 24, "w")


// const calculateInterest =  (int, versementNumber, cap) => {
//     let capital = cap
//     let monthlyCapital = capital / versementNumber 
//     let versements = []
//     let totalInterest = 0
//     let totalPret = 0
//     // // console.log(monthlyInt)
//     // for (var i = 1; i <= versementNumber; i++) {
//     //     let vers = {}
//     //     let monthlyInt = (capital * (int / 100) * (versementNumber / 52))
//     //     vers.interest = monthlyInt.toFixed(2)
//     //     vers.capital = monthlyCapital.toFixed(2)
//     //     vers.total = (monthlyInt + monthlyCapital).toFixed(2)
//     //     vers.newCapital = (capital - monthlyCapital).toFixed(2)
//     //     capital = vers.newCapital
//     //     versements.push(vers)
//     // }
//     // console.log(versements)
//     let versNum = versementNumber

//     for (var i = 1; i <= versementNumber; i++) {
//         let monthlyInt = (capital * (int / 100) * (versNum / 52))
//         capital = capital - monthlyCapital
//         totalInterest += monthlyInt
//         versNum--
//     }
//     console.log(totalInterest)
//     totalPret = cap + totalInterest
//     let monthlyVersement = totalPret / versementNumber
//     capital = cap
//     versNum = versementNumber
//     for (var y = 1; y <= versementNumber; y++) {
//         let vers = {}
//         let monthlyInt = (capital * (int / 100) * (versNum / 52))
//         vers.interest = monthlyInt.toFixed(2)
//         vers.capital = (monthlyVersement - monthlyInt).toFixed(2)
//         vers.total = monthlyVersement.toFixed(2)
//         vers.newCapital = (capital - monthlyCapital).toFixed(2)
//         capital = capital - monthlyCapital
//         versements.push(vers)
//         versNum--
//     }
//     console.log(versements)
// }

const calculateInterest =  (int, versementNumber, cap) => {
    let capital = cap
    let annualCapital = capital / (versementNumber / 12)
    let monthlyCapital = 0
    let versements = []
    let totalInterest = 0
    let totalPret = 0
    // // console.log(monthlyInt)
    // for (var i = 1; i <= versementNumber; i++) {
    //     let vers = {}
    //     let monthlyInt = (capital * (int / 100) * (versementNumber / 52))
    //     vers.interest = monthlyInt.toFixed(2)
    //     vers.capital = monthlyCapital.toFixed(2)
    //     vers.total = (monthlyInt + monthlyCapital).toFixed(2)
    //     vers.newCapital = (capital - monthlyCapital).toFixed(2)
    //     capital = vers.newCapital
    //     versements.push(vers)
    // }
    // console.log(versements)
    let versNum = versementNumber

    for (var i = 1; i <= versementNumber / 12; i++) {
        let annuallyInt = capital * (int / 100)
        capital = capital - annualCapital
        totalInterest += annuallyInt
    }
    console.log(totalInterest)
    totalPret = cap + totalInterest
    let monthlyVersement = totalPret / versementNumber
    capital = cap
    versNum = versementNumber
    for (var y = 1; y <= versementNumber / 12; y++) {
        let vers = {}
        let monthlyInt = (capital * (int / 100))
        vers.interest = monthlyInt.toFixed(2)
        vers.capital = (monthlyVersement - monthlyInt).toFixed(2)
        vers.total = monthlyVersement.toFixed(2)
        vers.newCapital = (capital - monthlyCapital).toFixed(2)
        capital = capital - annualCapital
        versements.push(vers)
        versNum--
    }
    console.log(versements)
}

calculateInterest(5, 36, 15000)


module.exports = {
    getListDateFromRange,
    // getListDateFromRangeWeekly
}