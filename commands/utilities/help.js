/** IMPORT */

require('dotenv').config();
const { NAME, ICON, AUTHOR_NAME, AUTHOR_NICK, AUTHOR_HASH, COLOR1 } = process.env;

const { MessageEmbed } = require('discord.js');

const autoDelete = require('../../functions/autoDelete.js');

/** HELP COMMAND */

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Wiadomość informacyjna',

    async run(client, prefix, msg, args) {

        autoDelete(msg, 20);

        return msg.reply({ // send
            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setThumbnail(ICON)
                .setTitle(`👋 | **Hej, jestem botem ${NAME}!**`)
                .setDescription(`
Dedykowany bot techniczny dla serwera Telewizji Politechniki Lubelskiej.

**Więcej informacji już niedługo...**

*Wszystkie komendy obsługują skróty np. zamiast pisać \`${prefix}ping\`, równie dobrze możesz wpisać: \`${prefix}p\` itp...*
                `)
                .setFooter({ text: `Autor bota: ${AUTHOR_NAME} (${AUTHOR_NICK}#${AUTHOR_HASH})` })
            ],
        }).then(msg => autoDelete(msg, 20));

    },
};