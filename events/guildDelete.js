/** IMPORT */

require('colors');

const realDate = require('../functions/realDate.js');

/** GUILD DELETE EVENT */

module.exports = {
    name: 'guildDelete',

    async run(client, guild) {

        /** left guild log */

        console.log(realDate() + ` Guild: ${guild.name}, ${guild.id}\n >>> Bot ` + `left`.brightRed + ` the server!`);

    },
};