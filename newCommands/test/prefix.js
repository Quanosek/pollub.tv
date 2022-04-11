/* IMPORT */

require('dotenv').config();
const PREFIX = process.env.PREFIX;
const COLOR1 = process.env.COLOR1;

const { MessageEmbed } = require('discord.js');

const { SlashCommandBuilder } = require('@discordjs/builders');

/* COMMAND */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prefix')
        .setDescription('Pokazuje preifx bota.'),

    async execute(client, interaction) {

        return interaction.reply({

            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setDescription(`⚙️ | Mój prefix to: \`${PREFIX}\``)
            ],
            ephemeral: true,

        });

    },
};