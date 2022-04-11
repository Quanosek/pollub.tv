/* COMMAND */

module.exports = {
    name: 'delete',
    description: 'Usuwa określoną liczbę wiadomości z kanału.',
    /*
        .addIntegerOption((option) =>
            option
            .setName('liczba')
            .setDescription('Określ ile wiadomości ma zostać usuniętych.')
            .setRequired(true),
        ),
    */

    async run(client, interaction) {

        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return interaction.reply({ content: 'Nie masz uprawnień, aby użyć tej komendy.', ephemeral: true });
        };

        if (!interaction.guild.me.permissions.has('MANAGE_MESSAGES')) {
            return interaction.reply({ content: 'Nie mam uprawnień, aby to zrobić.', ephemeral: true });
        };

        let amount = interaction.options.getInteger('liczba');

        if (!(amount >= 1 && amount <= 100)) {
            return interaction.reply({ content: 'Podaj poprawną wartość między \`1-100\`.', ephemeral: true });
        };

        let { size } = await interaction.channel.bulkDelete(amount);
        if (size === 0) size = 1;

        if (size === 1) messages = 'wiadomość'
        else messages = 'wiadomości'

        return interaction.reply({ content: `Usunięto \`${size}\` ${messages}.` })
    },
};