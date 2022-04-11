/* IMPORT & DEFINE */

require('dotenv').config();
const clr = require('colors');
const AUTHOR_NAME = process.env.AUTHOR_NAME;
const ICON = process.env.ICON;
const COLOR1 = process.env.COLOR1;

const { MessageEmbed } = require('discord.js');

const realDate = require('../functions/realDate.js')

/* GUILD CREATE EVENT */

module.exports = {
    name: 'guildCreate',

    async execute(client, guild) {

        // join guild log
        console.log(`> ` + clr.brightCyan(`[${realDate()}]`) + ` Guild: ${guild.name}, ${guild.id}\n>> Bot ` + clr.brightGreen(`joined`) + ` to the server!`);

    },
};