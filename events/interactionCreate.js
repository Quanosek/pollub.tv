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

            interaction.member = interaction.guild.members.cache.get(interaction.user.id);

            try {
                await cmd.run(client, interaction); // run slash command
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

    },
};