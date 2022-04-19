/* IMPORT */

require('colors');

const realDate = require('../functions/realDate.js')

/* GUILD CREATE EVENT */

module.exports = {
    name: 'guildCreate',

    async run(client, guild) {

        // join guild log
        console.log(realDate() + ` Guild: ${guild.name}, ${guild.id}\n >>> Bot ` + `joined`.brightGreen + ` to the server!`);

    },
};