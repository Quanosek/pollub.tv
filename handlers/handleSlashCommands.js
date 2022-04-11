/* IMPORT & DEFINE */

require('dotenv').config();
const GUILD_ID = process.env.GUILD_ID;

const fs = require('fs');
const clr = require('colors');

const realDate = require('../functions/realDate.js')

/* SLASH COMMANDS HANDLER */

module.exports = (client) => {
    client.handleSlashCommands = async(slashCommandsFolders, path) => {

        const slashCommands = [];

        for (folder of slashCommandsFolders) {
            const commandFiles = fs
                .readdirSync(`${path}/${folder}`)
                .filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const cmd = require(`../slashCommands/${folder}/${file}`);

                slashCommands.push(cmd);
                client.slashCommands.set((cmd.name), cmd);
            };
        };

        /* register slash commands */

        client.on('ready', async() => {

            try {
                console.log(clr.brightCyan(`[${realDate()}]`) + ' Started refreshing slash commands...');

                if (process.env.ENV === 'production') { // globaly
                    await client.application.commands.set(slashCommands);
                    console.log(clr.brightCyan(`[${realDate()}]`) + ' Registered slash commands ' + clr.brightYellow('globally') + '.');
                } else { // locally
                    await client.guilds.cache.get(GUILD_ID).commands.set(slashCommands);
                    console.log(clr.brightCyan(`[${realDate()}]`) + ' Registered slash commands ' + clr.brightYellow('locally') + '.');
                };
            } catch (err) {
                if (err) console.error(err);
            };

        });

    };
};