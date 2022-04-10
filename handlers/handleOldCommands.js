const fs = require('fs');

module.exports = (client) => {
    client.handleOldCommands = async(commandFolders, path) => {
        const commands = [];

        for (folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`${path}/${folder}`)
                .filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../oldCommands/${folder}/${file}`);

                client.commands.set(command.name, command);
            };
        };
    }
}