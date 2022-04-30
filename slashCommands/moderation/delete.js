/** IMPORT */

require('dotenv').config();
const { COLOR_ERR, COLOR1 } = process.env;

const { MessageEmbed } = require('discord.js');

const autoDelete = require('../../functions/autoDelete.js');

/** DELETE COMMAND */

module.exports = {
    name: 'delete',
    description: 'Usuwa określoną liczbę wiadomości z kanału',
    permissions: ['MANAGE_MESSAGES'],

    options: [{
            name: 'amout',
            description: 'Określ, ile wiadomości ma zostać usuniętych',
            type: 'NUMBER',
            required: true,
        },
        {
            name: 'target',
            description: 'Wybierz użytkownika, którego wiadomości chcesz usunąć',
            type: 'USER',
        },
    ],

    async run(client, interaction) {

        /** define */

        const { channel, options } = interaction;

        const amount = options.getNumber('amout');
        const target = options.getMember('target');

        /** ERROR */

        if (amount < 1 || amount > 100) {
            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor(COLOR_ERR)
                    .setDescription('🛑 | Podaj poprawną wartość z zakresu \`1-100\`.'),
                ],
                ephemeral: true,
            });
        };

        /** WITH FILTER */

        if (target) {

            /** define & filter */

            const messages = await channel.messages.fetch();

            let i = 0;
            const filtered = [];
            (await messages).filter((m) => {
                if (m.author.id === target.id && amount > i) {
                    filtered.push(m);
                    i++;
                };
            });

            return channel.bulkDelete(filtered, true).then(m => { // realization

                /** error */

                if (m.size === 0) {
                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(COLOR_ERR)
                            .setDescription(`🛑 | Nie znaleziono żadnej wiadomości do usunięcia.`),
                        ],
                        ephemeral: true,
                    });
                };

                /** translation */

                if (m.size === 1) translate = 'wiadomość';
                else translate = 'wiadomości';

                /** finish */

                return interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(COLOR1)
                        .setDescription(`🗑️ | Usunięto \`${m.size}\` ${translate} ${target}.`),
                    ],
                }).then(autoDelete(interaction, 10));
            });

        } else {

            /** WITHOUT FILTER */

            return channel.bulkDelete(amount, true).then(m => { //realization

                /** error */

                if (m.size === 0) {
                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(COLOR_ERR)
                            .setDescription(`🛑 | Nie znaleziono żadnej wiadomości do usunięcia.`),
                        ],
                        ephemeral: true,
                    });
                };

                /** translation */

                if (m.size === 1) translate = 'wiadomość';
                else translate = 'wiadomości';

                /** finish */

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