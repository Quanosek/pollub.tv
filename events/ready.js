/* IMPORT */

const clr = require('colors');

const realDate = require('../functions/realDate.js')

/* READY EVENT */

module.exports = {
    name: 'ready',
    once: true, // only once

    async execute(client) {
        console.log(clr.brightCyan(`[${realDate()}]`) + ' Bot is ready!'); // ready message

        client.user.setActivity('/help', { type: 'PLAYING' }); // bot activity
    },
};