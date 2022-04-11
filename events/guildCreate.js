/* IMPORT */

const clr = require('colors');

const realDate = require('../functions/realDate.js')

/* GUILD CREATE EVENT */

module.exports = {
    name: 'guildCreate',

    async execute(client, guild) {

        // join guild log
        console.log(`> ` + clr.brightCyan(`[${realDate()}]`) + ` Guild: ${guild.name}, ${guild.id}\n>> Bot ` + clr.brightGreen(`joined`) + ` to the server!`);

    },
};