/* IMPORT */

require('dotenv').config();
const INVITE = process.env.INVITE;
const COLOR1 = process.env.COLOR2;
const AUTHOR_NAME = process.env.AUTHOR_NAME;

const { MessageEmbed } = require('discord.js');

const { SlashCommandBuilder } = require('@discordjs/builders');

/* COMMAND */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Zaproś mnie na swój serwer!'),

    async execute(client, interaction) {
        return interaction.reply({
            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setTitle('📧 | Zaproś mnie na swój serwer!')
                .setURL(INVITE)
                .setFooter({ text: `Bot stworzony przez: ${AUTHOR_NAME}` })
                .setTimestamp()
            ]
        });
    },
};