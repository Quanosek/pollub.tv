/* IMPORT & DEFINE */

require('dotenv').config();
const PREFIX = process.env.PREFIX;
const COLOR_ERR = process.env.COLOR_ERR;
const COLOR1 = process.env.COLOR1;

const { MessageEmbed } = require('discord.js');

const msgAutoDelete = require('../functions/msgAutoDelete.js')

/* MESSAGE CREATE EVENT */

module.exports = {
    name: 'messageCreate',

    async run(client, msg) {

        // check permissions to send messages
        if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return;

        /* reply on mention */

        const mentionRegex = new RegExp(`^<@!?(${client.user.id})>( |)$`, 'gi');

        if (msg.content.match(mentionRegex)) {

            msgAutoDelete(msg);

            return msg.reply({
                embeds: [new MessageEmbed()
                    .setColor(COLOR1)
                    .setTitle(`😄 | Hej, to ja!`)
                    .setDescription(`
Jestem dedykowanym botem dla serwera dla osób zaangażowanych w rozwój Telewizji Politechniki Lubelskiej.

Mój prefix to \`${PREFIX}\`
Użyj komendy \`help\` po więcej inforamcji!
                    `)
                ]
            }).then(msg => msgAutoDelete(msg));
        };

        // avoid simple mistakes
        if (!msg.content.toLowerCase().startsWith(PREFIX) ||
            !msg.guild ||
            msg.author.bot ||
            msg.channel.type === 'dm'
        ) return;

        const [cmdName, ...args] = msg.content.slice(PREFIX.length).trim().split(/ +/g);

        // find command or aliases
        const cmd = client.commands.get(cmdName.toLowerCase()) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName.toLowerCase()));

        if (!cmd) return;

        //msg.member = msg.guild.members.cache.get(msg.user.id);

        if (!msg.member.permissions.has(cmd.userPermissions || [])) {

            msgAutoDelete(msg)

            return msg.reply({
                embeds: [new MessageEmbed()
                    .setColor(COLOR_ERR)
                    .setDescription('🛑 | Nie masz uprawnień do użycia tej komendy!')
                ],
            }).then(msg => msgAutoDelete(msg));
        };

        try {
            await cmd.run(client, msg, args); // run command
        } catch (err) {
            if (err) {
                console.error(err);

                msgAutoDelete(msg);

                return msg.reply({
                    embeds: [new MessageEmbed()
                        .setColor(COLOR_ERR)
                        .setDescription('🛑 | Pojawił się błąd podczas uruchamiania komendy!')
                    ]
                }).then(msg => msgAutoDelete(msg));
            };
        };

    },
};