/* IMPORT & DEFINE */

require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const fs = require('fs');
const clr = require('colors');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const realDate = require('../functions/realDate.js')

/* NEW COMMANDS HANDLER */

module.exports = (client) => {

    client.handleNewCommands = async(commandFolders, path) => {

        const commands = [];

        for (folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`${path}/${folder}`)
                .filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../newCommands/${folder}/${file}`);

                commands.push(command.data.toJSON());
                client.commands.set(('new' + command.data.name), command);
            };
        };

        /* register slash commands */

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

        (async() => {
            try {
                console.log(clr.brightCyan(`[${realDate()}]`) + ' Started refreshing slash commands...');

                if (process.env.ENV === 'production') {
                    await rest.put(Routes.applicationCommand(CLIENT_ID), { body: commands });
                    console.log(clr.brightCyan(`[${realDate()}]`) + ' Registered slash commands ' + clr.brightYellow('globally') + '.');
                } else {
                    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
                    console.log(clr.brightCyan(`[${realDate()}]`) + ' Registered slash commands ' + clr.brightYellow('locally') + '.');
                };
            } catch (err) { // error
                if (err) console.error(err);
            }
        })();
    };
};