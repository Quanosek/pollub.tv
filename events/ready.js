/* IMPORT */

const clr = require('colors');

const realDate = require('../functions/realDate.js')

/* READY EVENT */

module.exports = {
    name: 'ready',
    once: true, // only once

    async execute(client) {

        // on ready message
        console.log(clr.brightCyan(`[${realDate()}]`) + ` Bot ${process.env.NAME} is ready!`);

        // bot activity
        client.user.setActivity('/help', { type: 'PLAYING' });

    },
};