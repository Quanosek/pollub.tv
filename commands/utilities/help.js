/* IMPORT & DEFINE */

require('dotenv').config();
const NAME = process.env.NAME;
const PREFIX = process.env.PREFIX;
const ICON = process.env.ICON;
const AUTHOR = process.env.AUTHOR;
const COLOR2 = process.env.COLOR2;

const { MessageEmbed } = require('discord.js');

const msgAutoDelete = require('../../functions/msgAutoDelete.js')

/* COMMAND */

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Pomoc wszelaka!',

    async run(client, msg, args) {

        msgAutoDelete(msg);

        return msg.reply({
            embeds: [new MessageEmbed()
                .setColor(COLOR2)
                .setThumbnail(ICON)
                .setTitle(`👋 | **Hej, jestem botem ${NAME}!**`)
                .setDescription(`
Dedykowany bot techniczny dla serwera Telewizji Politechniki Lubelskiej.

**Więcej informacji już niedługo...**

*Wszystkie komendy obsługują skróty np. zamiast pisać \`${PREFIX}ping\`, równie dobrze możesz wpisać: \`${PREFIX}p\` itp...*
        `)
                .setFooter({ text: `Autor bota: ${AUTHOR}` })
                .setTimestamp()
            ]
        }).then(msg => msgAutoDelete(msg));

    }
};