/* IMPORT & DEFINE */

require('dotenv').config();
const PREFIX = process.env.PREFIX;
const COLOR1 = process.env.COLOR1;

const { MessageEmbed } = require('discord.js');

/* COMMAND */

module.exports = {
    name: 'prefix',
    description: 'Pokazuje prefix bota.',

    async run(client, interaction) {

        interaction.reply({

            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setDescription(`⚙️ | Mój prefix to: \`${PREFIX}\``)
            ],
            ephemeral: true,

        });

    },
};