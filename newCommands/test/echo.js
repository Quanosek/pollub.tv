/* IMPORT */

require('dotenv').config();
const COLOR_ERR = process.env.COLOR_ERR;
const COLOR1 = process.env.COLOR1;
const COLOR2 = process.env.COLOR2;

const { MessageEmbed } = require('discord.js');

const { SlashCommandBuilder } = require('@discordjs/builders');

/* COMMAND */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Powtarza podaną wiadomość.')
        .addStringOption((option) =>
            option
            .setName('wiadomość')
            .setDescription('Wiadomość, którą chcesz powtórzyć.')
            .setRequired(true)
        ),

    async execute(client, interaction) {
        return interaction.reply({
            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setDescription(interaction.options.getString('wiadomość'))
            ],
            ephemeral: true,
        });
    },
};