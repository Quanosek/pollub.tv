/* IMPORT */

require('colors');

/* FUNCTION */

function realDate() {

    const date = new Date()

    options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Europe/Brussels',
    };

    // special formatted date
    const newDate = new Intl.DateTimeFormat('pl-PL', options).format(date);

    return `[${newDate}]`.brightCyan

};

module.exports = realDate;