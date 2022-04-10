/* IMPORT */

const fs = require('fs');

/* OLD COMMANDS HANDLER */

module.exports = (client) => {
    client.handleOldCommands = async(commandFolders, path) => {

        for (folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`${path}/${folder}`)
                .filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../oldCommands/${folder}/${file}`);

                client.commands.set(command.name, command);
            };
        };
    };
};