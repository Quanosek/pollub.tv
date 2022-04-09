module.exports = {
    name: 'interactionCreate',

    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) returnValue

        try {
            await command.execute(interaction);
        } catch (err) {
            if (err) console.error(err);

            await interaction.reply({
                content: "This command didn't work properly.",
                ephemeral: true
            });
        }
    }
};