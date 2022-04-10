/* (NEW) INTERACTION CREATE EVENT */

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get('new' + interaction.commandName); // define new name in Colection

        if (!command) return;

        try {
            await command.execute(client, interaction); // create (NEW) command
        } catch (err) { // error
            if (err) console.error(err);

            await interaction.reply({
                content: 'Pojawił się błąd podczas uruchamiania komendy!',
                ephemeral: true
            });
        };
    },
};