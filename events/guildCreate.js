/** IMPORT */

require('dotenv').config();
const { PREFIX } = process.env;

require('colors');

const realDate = require('../functions/realDate.js');
const schema = require('../schemas/guilds.js');

/** GUILD CREATE EVENT */

module.exports = {
    name: 'guildCreate',

    async run(client, guild) {

        await schema.create({ // create db
            guildName: guild.name,
            guildId: guild.id,
            prefix: PREFIX,
        });

        console.log(realDate() + ` Guild: ${guild.name}, ${guild.id}`.grey + `\n >>> Bot ` + `joined`.brightGreen + ` to the server!`); // log

    },
};