/* IMPORT */

require('dotenv').config();
const COLOR1 = process.env.COLOR1;

const { MessageEmbed } = require('discord.js');

const { SlashCommandBuilder } = require('@discordjs/builders');
const msgAutoDelete = require('../../functions/msgAutoDelete.js')

/* COMMAND */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping-Pong!'),

    async execute(client, interaction) {

        interaction.reply({

            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setDescription('🏓 | Pong!')
            ],
            ephemeral: true,
            fetchReply: true,

        }).then(resultmsg => {

            interaction.editReply({
                embeds: [new MessageEmbed()
                    .setColor(COLOR1)
                    .setTitle('🏓 | Pong!')
                    .setDescription(`
Opóźnienie bota: \`${resultmsg.createdTimestamp - interaction.createdTimestamp} ms\`
Opóźnienie API: \`${client.ws.ping} ms\`
                `),
                ],
            });

        });
    },
};