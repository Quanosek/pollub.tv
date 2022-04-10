/* IMPORT */

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

        /* <--- welcome message ---> */

        let channelToSend;

        guild.channels.cache.forEach(channel => {
            if (
                channel.type === 'GUILD_TEXT' &&
                channel.permissionsFor(guild.me).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])
            ) channelToSend = channel;
        });

        if (channelToSend) {

            return channelToSend.send({
                embeds: [new MessageEmbed()
                    .setColor(COLOR1)
                    .setThumbnail(ICON)
                    .setTitle('😄 | Cieszę się, że tu jestem!')
                    .setDescription(`
opis
        `)
                    .setFooter(`Bot stworzony przez: ${AUTHOR_NAME}`)
                    .setTimestamp()
                ]
            }).catch(err => {
                console.error(`> ` + clr.brightCyan(`[${realDate()}]`) + ` On guildCreate: ` + clr.Red(`Failed to create welcome-message (code ${err.code})`) + `.`);
            });

        };

    }
};