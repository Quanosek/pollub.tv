console.clear(); // start with clear terminal

/** IMPORT */

require('dotenv').config();
const { TOKEN, MONGO_URI } = process.env;

require('colors');
const fs = require('fs');
const mongoose = require('mongoose');

const realDate = require('./functions/realDate.js')

/** MAIN DEFINE */

const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 32767 }); // define client

/** commands collections */

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

/** MAIN FUNCTION */

(async() => {

    for (file of handlers) {
        require(`./handlers/${file}`)(client);
    };

    /** handlers run */

    client.handleEvents(eventFiles, './events');
    client.handleSlashCommands(slashCommandsFolders, './slashCommands');
    client.handleCommands(commandsFolders, './commands');

    /** mongoose connection */

    try {
        if (!MONGO_URI) return;
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log(realDate() + ' Connected to database.'));
    } catch (err) {
        if (err) return console.error(` >>> ${err}`.brightRed);
    };

})();

client.login(TOKEN); // token