/* IMPORT & DEFINE */

require('dotenv').config();
const NAME = process.env.NAME;
const PREFIX = process.env.PREFIX;
const ICON = process.env.ICON;
const COLOR1 = process.env.COLOR2;
const AUTHOR_NAME = process.env.AUTHOR_NAME;

const { MessageEmbed } = require('discord.js');

const msgAutoDelete = require('../../functions/msgAutoDelete.js')

/* COMMAND */

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Pomoc wszelaka!',

    async run(client, msg, args) {

        msgAutoDelete(msg, 60);

        return msg.reply({
            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setThumbnail(ICON)
                .setTitle(`👋 | **Hej, jestem botem ${NAME}!**`)
                .setDescription(`
Dedykowany bot techniczny dla serwera Telewizji Politechniki Lubelskiej.

**Więcej informacji już niedługo...**

*Wszystkie komendy obsługują skróty np. zamiast pisać \`${PREFIX}ping\`, równie dobrze możesz wpisać: \`${PREFIX}p\` itp...*
        `)
                .setFooter({ text: `Bot stworzony przez: ${AUTHOR_NAME}` })
                .setTimestamp()
            ]
        }).then(msg => msgAutoDelete(msg, 60));

    }
};