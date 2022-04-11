/* IMPORT */

const clr = require('colors');

const realDate = require('../functions/realDate.js')

/* GUILD DELETE EVENT */

module.exports = {
    name: 'guildDelete',

    async execute(client, guild) {

        // guild left log
        console.log(`> ` + clr.brightCyan(`[${realDate()}]`) + ` Guild: ${guild.name}, ${guild.id}\n>> Bot ` + clr.brightRed(`left`) + ` the server!`);

    },
};