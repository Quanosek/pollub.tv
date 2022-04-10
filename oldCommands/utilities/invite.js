/* IMPORT */

require('dotenv').config();
const INVITE = process.env.INVITE;
const COLOR1 = process.env.COLOR2;
const AUTHOR_NAME = process.env.AUTHOR_NAME;

const { MessageEmbed } = require('discord.js');

const msgAutoDelete = require('../../functions/msgAutoDelete.js')

/* COMMAND */

module.exports = {
    name: 'invite',
    aliases: ['inv'],
    description: 'Zaproś mnie na swój serwer!',

    async execute(client, msg, args) {

        msgAutoDelete(msg, 15);

        return msg.reply({
            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setTitle('📧 | Zaproś mnie na swój serwer!')
                .setURL(INVITE)
                .setFooter({ text: `Bot stworzony przez: ${AUTHOR_NAME}` })
                .setTimestamp()
            ]
        }).then(msg => msgAutoDelete(msg, 15));

    }
};