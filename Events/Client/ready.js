require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const TOKEN = process.env.TOKEN;

module.exports = {
    name: 'ready',
    once: true,

    execute(client, commands) {
        console.log(' > Bot is online.');
        client.user.setActivity('?help', { type: 'LISTENING' });

        const CLIENT_ID = client.user.id;

        const rest = new REST({ version: '10' }).setToken(TOKEN);

        (async() => {
            try {
                if (process.env.ENV === 'production') {
                    await rest.put(Routes.applicationCommands(CLIENT_ID), {
                        body: commands,
                    });
                    console.log(' > Successfully registered commands globally.');
                } else {
                    await rest.put(
                        Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                            body: commands,
                        }
                    );
                    console.log(' > Successfully registered commands localy.');
                };
            } catch (err) {
                if (err) console.error(err);
            }
        })();
    }
};