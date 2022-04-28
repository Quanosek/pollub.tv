/** IMPORT */

require('dotenv').config();
const { COLOR_ERR, COLOR1 } = process.env;

const { MessageEmbed } = require('discord.js');

const autoDelete = require('../../functions/autoDelete.js');

/** DELETE COMMAND */

module.exports = {
    name: 'delete',
    aliases: ['d'],
    description: 'Usuwa określoną liczbę wiadomości z kanału.',
    permissions: ['MANAGE_MESSAGES'],

    async run(client, prefix, msg, args) {

        const amount = parseInt(args[0]) + 1; // define amount

        /** ERROR */

        if (!amount) {

            autoDelete(msg, 5);

            return msg.reply({
                embeds: [new MessageEmbed()
                    .setColor(COLOR_ERR)
                    .setDescription('🛑 | Podaj liczbę wiadomości do usunięcia.'),
                ],
            }).then(msg => autoDelete(msg, 5));

        };

        /** WITH FILTER */

        if (args[1]) {

            /** define */

            const targetName = args[1];
            const targetId = args[1].replace(/[\\<>@#&!]/g, '');

            const mention = msg.mentions.members.first();

            /** error */

            if (mention && targetId !== mention.id) {
                autoDelete(msg, 5);

                return msg.reply({
                    embeds: [new MessageEmbed()
                        .setColor(COLOR_ERR)
                        .setDescription('🛑 | Podaj poprawną nazwę użytkownika (wspominka).'),
                    ],
                }).then(msg => autoDelete(msg, 5));
            };

            const messages = await msg.channel.messages.fetch(); // define

            /** filter */

            let i = 0;
            const filtered = [];
            (await messages).filter((m) => {
                if (m.author.id === targetId && amount > i) {
                    filtered.push(m);
                    i++;
                };
            });

            /** error */

            return msg.channel.bulkDelete(filtered, true).then(m => {

                if (targetId !== msg.author.id) msg.delete();
                else m.size += 1;

                if (m.size <= 1) {
                    return msg.channel.send({
                        embeds: [new MessageEmbed()
                            .setColor(COLOR_ERR)
                            .setDescription(`🛑 | Nie znaleziono żadnej wiadomości do usunięcia.`),
                        ],
                    }).then(msg => autoDelete(msg, 5));
                };

                /** translation */

                if (m.size === 2) translate = 'wiadomość';
                else translate = 'wiadomości';

                /** finish */

                return msg.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(COLOR1)
                        .setDescription(`🗑️ | Usunięto \`${m.size-1}\` ${translate} ${targetName}.`),
                    ],
                }).then(msg => autoDelete(msg, 10));
            });

        } else {

            /** WITHOUT FILTER */

            return msg.channel.bulkDelete(amount, true).then(m => {

                /** error */

                if (m.size <= 1) {
                    return msg.channel.send({
                        embeds: [new MessageEmbed()
                            .setColor(COLOR_ERR)
                            .setDescription(`🛑 | Nie znaleziono żadnej wiadomości do usunięcia.`),
                        ],
                    }).then(msg => autoDelete(msg, 5));
                };

                /** translation */

                if (m.size === 2) translate = 'wiadomość';
                else translate = 'wiadomości';

                /** finish */

                return msg.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(COLOR1)
                        .setDescription(`🗑️ | Usunięto \`${m.size-1}\` ${translate}.`),
                    ],
                }).then(msg => autoDelete(msg, 10));

            });

        };

    },
};