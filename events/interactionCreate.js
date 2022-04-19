/* IMPORT */

require('dotenv').config();
const { COLOR_ERR } = process.env;

require('colors');

const { MessageEmbed } = require('discord.js');

/* INTERACTION CREATE EVENT */

module.exports = {
    name: 'interactionCreate',

    async run(client, interaction) {

        // Slash Commands Handling

        if (interaction.isCommand()) {

            const cmd = client.slashCommands.get(interaction.commandName);
            if (!cmd) return;

            interaction.member = interaction.guild.members.cache.get(interaction.user.id);

            if (!interaction.member.permissions.has(cmd.userPermissions || [])) {
                return interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(COLOR_ERR)
                        .setDescription('🛑 | Nie masz uprawnień do użycia tej komendy!')
                    ],
                    ephemeral: true,
                });
            };

            try {
                await cmd.run(client, interaction); // run slash command
            } catch (err) {
                if (err) {
                    console.error(`${err}`.brightRed);

                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(COLOR_ERR)
                            .setDescription('🛑 | Pojawił się błąd podczas uruchamiania komendy!')
                        ],
                        ephemeral: true,
                    });
                };
            };

        };

    },
};