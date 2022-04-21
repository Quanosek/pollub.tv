/** IMPORT */

require('dotenv').config();
const { PREFIX, AUTHOR, COLOR_ERR, COLOR1 } = process.env;

require('colors');
const { MessageEmbed } = require('discord.js');

const autoDelete = require('../functions/autoDelete.js');
const Schema = require('../schemas/guildConfigs.js');

/** MESSAGE CREATE EVENT */

module.exports = {
    name: 'messageCreate',

    async run(client, msg) {

        if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return; // if no permissions to send

        /** reply on mention */

        const mentionRegex = new RegExp(`^<@!?(${client.user.id})>( |)$`, 'gi');

        if (msg.content.match(mentionRegex)) {

            autoDelete(msg);

            return msg.reply({
                embeds: [new MessageEmbed()
                    .setColor(COLOR1)
                    .setTitle(`😄 | Hej, to ja!`)
                    .setDescription(`
Jestem dedykowanym botem dla serwera dla osób zaangażowanych w rozwój Telewizji Politechniki Lubelskiej.

Mój prefix to \`${PREFIX}\`
Użyj komendy \`help\` po więcej inforamcji!
                    `)
                    .setFooter({ text: `Autor bota: ${AUTHOR}` })
                    .setTimestamp()
                ],
            }).then(msg => autoDelete(msg));
        };

        /** avoid simple mistakes */

        if (!msg.content.toLowerCase().startsWith(PREFIX) ||
            !msg.guild ||
            msg.author.bot ||
            msg.channel.type === 'dm'
        ) return;

        const [cmdName, ...args] = msg.content.slice(PREFIX.length).trim().split(/ +/g);

        /** find command or aliases */

        const cmd = client.commands.get(cmdName.toLowerCase()) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName.toLowerCase()));

        /** error */

        if (!cmd) return; // no command
        if (!msg.member.permissions.has(cmd.permissions || [])) { // no permissions

            autoDelete(msg)

            return msg.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(COLOR_ERR)
                    .setDescription('🛑 | Nie masz uprawnień do użycia tej komendy!')
                ],
            }).then(msg => autoDelete(msg));
        };

        /** custom prefix */

        const guildConfigs = Schema.findOne({ guildId: msg.guildId });
        let prefix = PREFIX;

        if (guildConfigs && guildConfigs.prefix) {
            prefix = guildConfigs.prefix;
        };

        /** finish */

        try {
            await cmd.run(client, prefix, msg, args); // run command
        } catch (err) {
            if (err) {

                console.error(` >>> ${err}`.brightRed);
                autoDelete(msg);

                return msg.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(COLOR_ERR)
                        .setDescription('🛑 | Pojawił się błąd podczas uruchamiania komendy!')
                    ],
                }).then(msg => autoDelete(msg));
            };
        };

    },
};