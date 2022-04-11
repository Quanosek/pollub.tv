/* IMPORT */

require('dotenv').config();
const TOKEN = process.env.TOKEN

const fs = require('fs');

/* MAIN DEFINE */

const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 32767 }); // define client

// commands collections
client.commands = new Collection();
client.slashCommands = new Collection();

const handlers = fs
    .readdirSync('./handlers')
    .filter(file => file.endsWith('.js'));

const eventFiles = fs
    .readdirSync('./events')
    .filter(file => file.endsWith('.js'));

const slashCommandsFolders = fs.readdirSync('./slashCommands');
const commandsFolders = fs.readdirSync('./commands');

/* MAIN FUNCTION */

(async() => {

    for (file of handlers) {
        require(`./handlers/${file}`)(client);
    };

    // handlers run

    client.handleEvents(eventFiles, './events');
    client.handleSlashCommands(slashCommandsFolders, './slashCommands');
    client.handleCommands(commandsFolders, './commands');

})();

client.login(TOKEN); // token