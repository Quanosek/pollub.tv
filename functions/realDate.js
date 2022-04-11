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
    return new Intl.DateTimeFormat('pl-PL', options).format(date);

};

module.exports = realDate;