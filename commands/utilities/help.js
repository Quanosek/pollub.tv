/** IMPORT */

require('dotenv').config();
const { NAME, PREFIX, ICON, AUTHOR, COLOR2 } = process.env;

const { MessageEmbed } = require('discord.js');

const autoDelete = require('../../functions/autoDelete.js');

/** COMMAND */

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Pomoc wszelaka!',

    async run(client, prefix, msg, args) {

        autoDelete(msg, 20);

        return msg.reply({ // send
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
            ],
        }).then(msg => autoDelete(msg, 20));

    },
};