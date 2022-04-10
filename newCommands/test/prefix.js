/* IMPORT */

require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');

/* COMMAND */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prefix')
        .setDescription('Pokazuje preifx bota.'),

    async execute(client, interaction) {
        await interaction.reply({
            content: `Mój prefix to: \`${process.env.PREFIX}\``,
            ephemeral: true,
        });
    },
};