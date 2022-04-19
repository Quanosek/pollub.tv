/* IMPORT & DEFINE */

require('dotenv').config();
const COLOR1 = process.env.COLOR1;

const { MessageEmbed } = require('discord.js');

const autoDelete = require('../../functions/autoDelete.js')

/* COMMAND */

module.exports = {
    name: 'ping',
    aliases: ['p'],
    description: 'Ping-Pong!',

    async run(client, msg, args) {

        autoDelete(msg);

        return msg.reply({
            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setDescription('🏓 | Pong!')
            ]
        }).then(resultmsg => {

            return resultmsg.edit({
                embeds: [new MessageEmbed()
                    .setColor(COLOR1)
                    .setTitle('🏓 | Pong!')
                    .setDescription(`
    Opóźnienie bota: \`${resultmsg.createdTimestamp - msg.createdTimestamp} ms\`
    Opóźnienie API: \`${client.ws.ping} ms\`
                    `),
                ],
            });

        }).then(msg => autoDelete(msg));
    },
};