/* IMPORT & DEFINE */

require('dotenv').config();
const PREFIX = process.env.PREFIX;
const COLOR_ERR = process.env.COLOR_ERR;
const COLOR1 = process.env.COLOR1;

const { MessageEmbed } = require('discord.js');

const msgAutoDelete = require('../functions/msgAutoDelete.js')

/* (OLD) MESSAGE CREATE EVENT */

module.exports = {
    name: 'messageCreate',

    async execute(msg, client) {

        // check permissions to send messages
        if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return;

        /* reply on mention */

        const mentionRegex = new RegExp(`^<@!?(${client.user.id})>( |)$`, 'gi');

        if (msg.content.match(mentionRegex)) {

            msgAutoDelete(msg);

            return msg.reply({
                embeds: [new MessageEmbed()
                    .setColor(COLOR1)
                    .setTitle(`⚙️ | Mój prefix to : \`${PREFIX}\``)
                    .setDescription(`Użyj komendy \`${PREFIX}help\` aby uzyskać więcej informacji!`)
                ]
            }).then(msg => msgAutoDelete(msg));
        };

        // avoid simple mistakes
        if (!msg.content.startsWith(PREFIX) ||
            msg.author.bot ||
            msg.channel.type === 'dm'
        ) return;

        const args = msg.content.slice(PREFIX.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase();

        // find command or aliases
        const command = client.commands.get('old' + commandName) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        try {
            if (command.data) return; // reject interaction commands
            await command.execute(client, msg, args); // create (OLD) command
        } catch (err) { // error
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