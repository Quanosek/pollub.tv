require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prefix')
        .setDescription('Sprawdź prefix bota'),

    async execute(interaction) {
        interaction.reply({
            content: `Mój prefix to: \`${process.env.PREFIX}\``,
            ephemeral: true
        });
    }
};