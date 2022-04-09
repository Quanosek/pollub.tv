const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Powtarza napisaną wiadomość')
        .addStringOption(option =>
            option
            .setName('wiadomość')
            .setDescription('Treść wiadomości, którą chcesz powtórzyć')
            .setRequired(true),
        ),

    async execute(interaction) {
        interaction.reply({
            content: interaction.options.getString('wiadomość')
        });
    }
};