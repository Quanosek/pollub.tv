/* IMPORT & DEFINE */

require('dotenv').config();
const COLOR1 = process.env.COLOR1;

const { MessageEmbed } = require('discord.js');

/* INTERACTION CREATE EVENT */

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {

        // Slash Commands Handling

        if (interaction.isCommand()) {

            const cmd = client.slashCommands.get(interaction.commandName);
            if (!cmd) return;

            const args = [];

            for (let option of interaction.options.data) {

                if (option.type === "SUB_COMMAND") {
                    if (option.name) { args.push(option.name) };
                    option.options.forEach((x) => {
                        if (x.value) { args.push(x.value) };
                    });
                } else if (option.value) { args.push(option.value) };
            };

            interaction.member = interaction.guild.members.cache.get(interaction.user.id);

            try {
                await cmd.run(client, interaction, args); // run slash command
            } catch (err) {
                if (err) {
                    console.error(err);

                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(COLOR1)
                            .setDescription('🛑 | Pojawił się błąd podczas uruchamiania komendy!')
                        ],
                        ephemeral: true,
                    });
                };
            };

        };

        // Context Menu Handling

        if (interaction.isContextMenu()) {
            const cmd = client.slashCommands.get(interaction.commandName);
            if (!cmd) return;
        };
    },
};