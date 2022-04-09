const fs = require('fs');

module.exports = (client, Discord) => {
    const commandFolders = fs.readdirSync('./Slash commands');

    for (const folder of commandFolders) {

        const commandFiles = fs
            .readdirSync(`./Slash commands/${folder}`)
            .filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../Slash commands/${folder}/${file}`);

            client.commands.set(command.name, command);
        }
    }
};