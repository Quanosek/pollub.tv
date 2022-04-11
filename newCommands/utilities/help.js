/* IMPORT & DEFINE */

require('dotenv').config();
const NAME = process.env.NAME;
const PREFIX = process.env.PREFIX;
const ICON = process.env.ICON;
const COLOR1 = process.env.COLOR2;
const AUTHOR_NAME = process.env.AUTHOR_NAME;

const { MessageEmbed } = require('discord.js');

const { SlashCommandBuilder } = require('@discordjs/builders');

/* COMMAND */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Pomoc wszelaka!'),

    async execute(client, interaction) {
        return interaction.reply({
            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setThumbnail(ICON)
                .setTitle(`👋 | **Hej, jestem ${NAME}!**`)
                .setDescription(`
Dedykowany bot techniczny dla serwera Telewizji Politechniki Lubelskiej.
                
**Więcej informacji już niedługo...**
                `)
                .setFooter({ text: `Bot stworzony przez: ${AUTHOR_NAME}` })
                .setTimestamp()
            ]
        });
    },
};