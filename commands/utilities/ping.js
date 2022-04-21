/** IMPORT */

require('dotenv').config();
const { COLOR1 } = process.env;

const { MessageEmbed } = require('discord.js');

const autoDelete = require('../../functions/autoDelete.js')

/** COMMAND */

module.exports = {
    name: 'ping',
    aliases: ['p'],
    description: 'Ping-Pong!',

    async run(client, msg, args) {

        autoDelete(msg);

        return msg.reply({ // send
            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setDescription('🏓 | Pong!')
            ],
        }).then(resultmsg => {

            return resultmsg.edit({ // modify sended
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