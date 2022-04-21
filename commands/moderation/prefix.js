/** IMPORT */

require('dotenv').config();
const { NAME, PREFIX, AUTHOR, COLOR_ERR, COLOR1 } = process.env;

const { MessageEmbed } = require('discord.js');

const autoDelete = require('../../functions/autoDelete.js');

/** COMMAND */

module.exports = {
    name: 'prefix',
    aliases: ['pref'],
    description: 'Zmiana prefixu bota.',
    permissions: 'ADMINISTRATOR',

    async run(client, msg, args, prefix) {

        /** change command */

        if (args[0] === 'change' || args[0] === 'ch') {

            const newPrefix = args[1]

            /** errors */

            if (!newPrefix) {
                autoDelete(msg);

                return msg.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(COLOR_ERR)
                        .setDescription('⚙️ | Musisz jeszcze wpisać nowy prefix!')
                    ],
                }).then(msg => autoDelete(msg));
            };

            if (newPrefix.length > 8) {
                msgAutoDelete(msg);

                return msg.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(COLOR_ERR)
                        .setDescription('⚙️ | Wybrany prefix jest zbyt długi!')
                    ],
                }).then(msg => autoDelete(msg));
            };

            if (args[2]) {
                autoDelete(msg);

                return msg.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(COLOR_ERR)
                        .setDescription('⚙️ | W prefixie nie może być spacji!')
                    ],
                }).then(msg => autoDelete(msg));
            };

            /** command */

            autoDelete(msg, 15);

            await db.set(`prefix_${msg.guild.id}`, newPrefix);

            return msg.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(COLOR1)
                    .setDescription(`⚙️ | Zmieniono prefix na: \`${newPrefix}\``)
                ],
            }).then(msg => autoDelete(msg, 15));
        };

        /** reset command */

        if (args[0] === 'reset' || args[0] === 'r') {
            autoDelete(msg, 15);

            if (db.get(`prefix_${msg.guild.id}`)) { await db.delete(`prefix_${msg.guild.id}`) }

            return msg.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(COLOR1)
                    .setDescription(`⚙️ | Przywrócono domyślny prefix: \`${PREFIX}\``)
                ],
            }).then(msg => autoDelete(msg, 15));
        };

        /** help command */

        autoDelete(msg, 45);

        return msg.channel.send({
            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setTitle(`⚙️ | Menu zmiany prefixu`)
                .setDescription(`
Komenda pozwala na zmianę prefixu tylko dla tego serwera, w razie zapomnienia prefixu zawsze można wspomnieć bota, tzn. wpisać @${NAME}.
** ● Komendy:**
\`${prefix}prefix change <nowy prefix>\` - ustawia nowy prefix
\`${prefix}prefix reset\` - przywraca domyślny prefix (\`${PREFIX}\`)
** ● Informacje dodatkowe:**
Wszystkie komendy obsługują również skróty np. zamiast pisać \`${PREFIX}prefix\`, równie dobrze możesz wpisać: \`${PREFIX}pf\` itp..
                `)
                .setFooter({ text: `Bot stworzony przez: ${AUTHOR}` })
                .setTimestamp()
            ],
        }).then(msg => autoDelete(msg, 45));

    },
};