const { MessageEmbed } = require('discord.js');

/* <--- Command ---> */

module.exports = {
    name: 'ping',
    aliases: [],
    description: 'ping',

    async run(message, client, Discord) {
        return message.channel.send({
            embeds: [new MessageEmbed()
                .setColor('RANDOM')
                .setDescription('pong!')
            ]
        }).then(resultmsg => {

            const ping = resultmsg.createdTimestamp - message.createdTimestamp

            return resultmsg.edit({
                embeds: [new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Opóźnienie:')
                    .setDescription(`Bot: \`${ping} ms\`\n API: \`${client.ws.ping} ms\``)
                ]
            });

        })
    }
};