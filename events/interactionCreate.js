module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {
        if (!(interaction.isCommand() || interaction.commandName)) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (err) {
            if (err) console.error(err);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        };
    },
};