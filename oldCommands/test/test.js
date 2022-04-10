/* IMPORT & DEFINE */

require('dotenv').config();
const COLOR_ERR = process.env.COLOR_ERR;
const COLOR1 = process.env.COLOR1;
const COLOR2 = process.env.COLOR2;

const { MessageEmbed } = require('discord.js');

const msgAutoDelete = require('../../functions/msgAutoDelete.js')

/* COMMAND */

module.exports = {
    name: 'test',
    aliases: [],
    description: 'test',

    async execute(client, msg, args) {

        msgAutoDelete(msg);

        return msg.reply({
            embeds: [new MessageEmbed()
                .setColor(COLOR2)
                .setDescription('Test!')
            ]
        }).then(msg => msgAutoDelete(msg));
    },
};