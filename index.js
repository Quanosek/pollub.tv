require('dotenv').config();
const fs = require('fs');

const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 32767 });

client.commands = new Collection();

const handlers = fs
    .readdirSync('./handlers')
    .filter(file => file.endsWith('.js'));

const eventFiles = fs
    .readdirSync('./events')
    .filter(file => file.endsWith('.js'));

const newCommandFolders = fs.readdirSync('./newCommands');
const oldCommandFolders = fs.readdirSync('./oldCommands');

(async() => {
    for (file of handlers) {
        require(`./handlers/${file}`)(client);
    };

    client.handleEvents(eventFiles, './events');
    client.handleNewCommands(newCommandFolders, './newCommands');
    client.handleOldCommands(oldCommandFolders, './oldCommands');

    client.login(process.env.TOKEN);
})();