require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prefix')
        .setDescription('Shows bot prefix'),

    async execute(interaction) {
        await interaction.reply({
            content: `My prefix is: \`${process.env.PREFIX}\``,
            ephemeral: true,
        });
    },
};