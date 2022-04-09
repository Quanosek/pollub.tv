const fs = require('fs');

module.exports = (client, Discord) => {
    const legacy_commandFolders = fs.readdirSync('./Commands');

    for (const legacy_folder of legacy_commandFolders) {

        const legacy_commandFiles = fs
            .readdirSync(`./Commands/${legacy_folder}`)
            .filter(file => file.endsWith('.js'));

        for (const legacy_file of legacy_commandFiles) {
            const legacy_command = require(`../Commands/${legacy_folder}/${legacy_file}`);

            client.commands.set(legacy_command.name, legacy_command);
        }
    }
};