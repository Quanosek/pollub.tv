/* IMPORT */

const clr = require('colors');

const realDate = require('../functions/realDate.js')

/* READY EVENT */

module.exports = {
    name: 'ready',
    once: true, // only once

    async run(client) {

        // on ready message
        console.log(realDate() + ' Bot ' + clr.underline(process.env.NAME) + ' is ready!');

        // bot activity
        client.user.setActivity('najlepsze wykłady', { type: 'LISTENING' });

    },
};