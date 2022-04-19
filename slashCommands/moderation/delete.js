/* IMPORT */

require('dotenv').config();
const COLOR_ERR = process.env.COLOR_ERR;
const COLOR1 = process.env.COLOR1;

const { MessageEmbed } = require('discord.js');

const autoDelete = require('../../functions/autoDelete.js')

/* COMMAND */

module.exports = {
    name: 'delete',
    aliases: ['d'],
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
        },
    ],

    async run(client, interaction) {

        const { channel, options } = interaction;

        const amount = options.getNumber('amout');
        const target = options.getMember('target');

        if (amount < 1 || amount > 100) {
            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor(COLOR_ERR)
                    .setDescription('🛑 | Podaj poprawną wartość z zakresu \`1-100\`.'),
                ],
                ephemeral: true,
            });
        };

        if (target) {

            const messages = await channel.messages.fetch();

            let i = 0;
            const filtered = [];
            (await messages).filter((m) => {
                if (m.author.id === target.id && amount > i) {
                    filtered.push(m);
                    i++;
                };
            });

            return channel.bulkDelete(filtered, true).then(m => {

                if (m.size === 0) {
                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(COLOR_ERR)
                            .setDescription(`🛑 | Nie znaleziono żadnej wiadomości do usunięcia.`),
                        ],
                        ephemeral: true,
                    });
                };

                if (m.size === 1) translate = 'wiadomość';
                else translate = 'wiadomości';

                return interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(COLOR1)
                        .setDescription(`🗑️ | Usunięto \`${m.size}\` ${translate} ${target}.`),
                    ],
                }).then(autoDelete(interaction, 10));
            });

        } else {

            return channel.bulkDelete(amount, true).then(m => {

                if (m.size === 0) {
                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(COLOR_ERR)
                            .setDescription(`🛑 | Nie znaleziono żadnej wiadomości do usunięcia.`),
                        ],
                        ephemeral: true,
                    });
                };

                if (m.size === 1) translate = 'wiadomość';
                else translate = 'wiadomości';

                return interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(COLOR1)
                        .setDescription(`🗑️ | Usunięto \`${m.size}\` ${translate}.`),
                    ],
                }).then(autoDelete(interaction, 10));
            });

        };

    },
};