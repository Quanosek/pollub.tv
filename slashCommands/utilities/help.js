/* IMPORT & DEFINE */

require('dotenv').config();
const NAME = process.env.NAME;
const ICON = process.env.ICON;
const AUTHOR = process.env.AUTHOR;
const COLOR2 = process.env.COLOR2;

const { MessageEmbed } = require('discord.js');

const msgAutoDelete = require('../../functions/msgAutoDelete.js')

/* COMMAND */

module.exports = {
    name: 'help',
    description: 'Pomoc wszelaka!',

    async run(client, interaction) {

        return interaction.reply({

            embeds: [new MessageEmbed()
                .setColor(COLOR2)
                .setThumbnail(ICON)
                .setTitle(`👋 | **Hej, jestem ${NAME}!**`)
                .setDescription(`
Dedykowany bot techniczny dla serwera Telewizji Politechniki Lubelskiej.

**Więcej informacji już niedługo...**
                `)
                .setFooter({ text: `Autor bota: ${AUTHOR}` })
                .setTimestamp()
            ],

        }).then(msgAutoDelete(interaction, ));

    },
};