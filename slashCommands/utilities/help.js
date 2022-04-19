/* IMPORT */

require('dotenv').config();
const { NAME, ICON, AUTHOR, COLOR2 } = process.env;

const { MessageEmbed } = require('discord.js');

const autoDelete = require('../../functions/autoDelete.js')

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

        }).then(autoDelete(interaction, 20));

    },
};