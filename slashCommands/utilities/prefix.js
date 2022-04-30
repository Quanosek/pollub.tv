/** IMPORT */

require('dotenv').config();
const { PREFIX, AUTHOR_NAME, AUTHOR_NICK, AUTHOR_HASH, COLOR1 } = process.env;

const { MessageEmbed } = require('discord.js');

/** PREFIX COMMAND */

module.exports = {
    name: 'prefix',
    description: 'Pokazuje prefix bota',

    async run(client, interaction) {

        /** MANAGE DATABASE */

        let db = await schema.findOne({ guildId: interaction.guild.id });
        if (!db) db = await schema.create({

            guildId: interaction.guild.id,
            prefix: PREFIX,

        });

        let prefix = db.prefix; // custom prefix

        /** MESSAGE */

        interaction.reply({ // send

            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setDescription(`⚙️ | Mój prefix to: \`${prefix}\``)
                .setFooter({ text: `Autor bota: ${AUTHOR_NAME} (${AUTHOR_NICK}#${AUTHOR_HASH})` })
            ],
            ephemeral: true,

        });
    },
};