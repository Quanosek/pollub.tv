/** IMPORT */

require('dotenv').config();
const { AUTHOR_NAME, AUTHOR_NICK, AUTHOR_HASH } = process.env;

const { MessageEmbed } = require('discord.js');

const autoDelete = require('../../functions/autoDelete.js');

/** PING COMMAND */

module.exports = {
    name: 'ping',
    aliases: ['pg'],
    description: 'Ping-Pong!',

    async run(client, prefix, msg, args) {

        autoDelete(msg);

        return msg.reply({ // send
            embeds: [new MessageEmbed()
                .setColor('RANDOM')
                .setDescription('🏓 | Pong!')
            ],
        }).then(resultmsg => {

            return resultmsg.edit({ // modify sended
                embeds: [new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('🏓 | Pong!')
                    .setDescription(`
    Opóźnienie bota: \`${resultmsg.createdTimestamp - msg.createdTimestamp} ms\`
    Opóźnienie API: \`${client.ws.ping} ms\`
                    `)
                    .setFooter({ text: `Autor bota: ${AUTHOR_NAME} (${AUTHOR_NICK}#${AUTHOR_HASH})` })
                ],
            });

        }).then(msg => autoDelete(msg));

    },
};