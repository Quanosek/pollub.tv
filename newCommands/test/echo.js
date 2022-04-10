/* IMPORT */

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
        await interaction.reply({
            content: (interaction.options.getString('wiadomość')),
            ephemeral: true,
        });
    },
};