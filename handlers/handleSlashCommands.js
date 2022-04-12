/* IMPORT & DEFINE */

require('dotenv').config();
const GUILD_ID = process.env.GUILD_ID;

const fs = require('fs');
const clr = require('colors');

const realDate = require('../functions/realDate.js')

/* SLASH COMMANDS HANDLER */

module.exports = (client) => {
    client.handleSlashCommands = async(slashCommandsFolders, path) => {

        const slashCommandsArray = [];

        for (folder of slashCommandsFolders) {
            const commandFiles = fs
                .readdirSync(`${path}/${folder}`)
                .filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const cmd = require(`../slashCommands/${folder}/${file}`);

                slashCommandsArray.push(cmd); // save command
                client.slashCommands.set((cmd.name), cmd); // run command
            };
        };

        client.on('ready', async() => {

            /* permissions check */

            const MainGuild = await client.guilds.cache.get(GUILD_ID);

            MainGuild.commands.set(slashCommandsArray).then(async(command) => {
                const Roles = (commandName) => {
                    const cmdPerms = slashCommandsArray.find((cmd) => cmd.name === commandName).permission;
                    if (!cmdPerms) return null;

                    return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
                };

                const fullPermissions = command.reduce((accumulator, role) => {
                    const roles = Roles(role.name);
                    if (!roles) return accumulator;

                    const permissions = roles.reduce((a, r) => {
                        return [...a, { id: r.id, type: 'ROLE', permission: true }];
                    }, []);

                    return [...accumulator, { id: role.id, permissions }];
                }, []);

                await MainGuild.commands.permissions.set({ fullPermissions });
            });

            /* register slash commands */

            try {
                console.log(realDate() + ' Started refreshing slash commands...');

                if (process.env.ENV === 'production') { // globaly
                    await client.application.commands.set(slashCommandsArray);
                    console.log(realDate() + ' Registered slash commands ' + clr.underline('globally') + '.');
                } else { // locally
                    await client.guilds.cache.get(GUILD_ID).commands.set(slashCommandsArray);
                    console.log(realDate() + ' Registered slash commands ' + clr.underline('locally') + '.');
                };
            } catch (err) {
                if (err) console.error(err);
            };

        });

    };
};