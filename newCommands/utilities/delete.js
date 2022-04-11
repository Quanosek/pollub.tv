/* IMPORT */

const { SlashCommandBuilder } = require('@discordjs/builders');

/* COMMAND */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Usuwa określoną liczbę wiadomości z kanału.')
        .addStringOption((option) =>
            option
            .setName('liczba')
            .setDescription('Określ ile wiadomości ma zostać usuniętych.')
            .setRequired(true)
        ),

    async execute(client, interaction) {

        const amount = interaction.options.getString('liczba');
        return console.log(`delete ${amount}`);
    },
};