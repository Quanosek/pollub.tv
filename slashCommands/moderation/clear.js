/* IMPORT */

require('dotenv').config();
const COLOR_ERR = process.env.COLOR_ERR;
const COLOR1 = process.env.COLOR1;

const { MessageEmbed } = require('discord.js');

/* COMMAND */

module.exports = {
    name: 'clear',
    description: 'Usuwa określoną liczbę wiadomości z kanału.',
    userPermissions: 'MANAGE_MESSAGES',
    options: [{
            name: 'amout',
            description: 'Określ, ile wiadomości ma zostać usuniętych.',
            type: 'NUMBER',
            required: true,
        },
        {
            name: 'target',
            description: 'Wybierz użytkownika, którego wiadomości chcesz usunąć.',
            type: 'USER',
            required: false,
        },
    ],

    async run(client, interaction) {

        const amount = interaction.options.getNumber('amout');
        const target = interaction.options.getMember('target');

        const Messages = await interaction.channel.messages.fetch();

        if (amount < 1 || amount > 100) {
            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor(COLOR_ERR)
                    .setDescription('🛑 | Podaj poprawną wartość między \`1-100\`.'),
                ],
                ephemeral: true,
            });
        };

        if (amount === 1) translate = 'wiadomość'
        else translate = 'wiadomości'

        if (target) {

            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if (m.author.id === target.id && amount > i) {
                    filtered.push(m);
                    i++;
                };
            });

            let { size } = await interaction.channel.bulkDelete(filtered);

            if (size === 0) {
                return interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(COLOR_ERR)
                        .setDescription('🛑 | Nie znaleziono żadnej wiadomości.'),
                    ],
                    ephemeral: true,
                });
            };

            if (size === 1) translate = 'wiadomość'
            else translate = 'wiadomości'

            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor(COLOR1)
                    .setDescription(`🗑️ | Usunięto \`${size}\` ${translate} ${target}.`),
                ],
            });

        } else {

            let { size } = await interaction.channel.bulkDelete(amount);

            if (size === 0) {
                return interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(COLOR_ERR)
                        .setDescription('🛑 | Nie znaleziono żadnej wiadomości.'),
                    ],
                    ephemeral: true,
                });
            };

            if (size === 1) translate = 'wiadomość'
            else translate = 'wiadomości'

            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor(COLOR1)
                    .setDescription(`🗑️ | Usunięto \`${size}\` ${translate}.`),
                ],
            });

        };

    },
};