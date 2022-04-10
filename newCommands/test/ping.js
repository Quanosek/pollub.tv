/* IMPORT */

const { SlashCommandBuilder } = require('@discordjs/builders');

/* COMMAND */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping-Pong!'),

    async execute(client, interaction) {
        await interaction.reply({
            content: 'Pong!',
            ephemeral: true,
        });
    },
};