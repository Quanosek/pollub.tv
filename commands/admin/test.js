const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test'),

    async execute(interaction) {
        interaction.reply({
            content: 'test'
        });
    }
};