/* IMPORT & DEFINE */

require('dotenv').config();
const COLOR1 = process.env.COLOR1;

const { MessageEmbed } = require('discord.js');

const msgAutoDelete = require('../../functions/msgAutoDelete.js')

/* COMMAND */

module.exports = {
    name: 'echo',
    aliases: [],
    description: 'Powtarza podaną wiadomość.',

    async execute(client, msg, args) {

        msgAutoDelete(msg);

        if (args = []) { args = 'Echo' };

        return msg.reply({
            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setDescription('⚙️ | ' + args)
            ]
        }).then(msg => msgAutoDelete(msg));
    },
};