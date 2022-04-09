/* IMPORT */

require('dotenv').config();
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });

const TOKEN = process.env.TOKEN;


/* COMMANDS HANDLER */

const commands = [];

client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands')

for (const folder of commandFolders) {

    const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    }
};


/* EVENTS HANDLER*/

const eventFiles = fs
    .readdirSync(`./events`)
    .filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, commands));
    } else {
        client.on(event.name, (...args) => event.execute(...args, commands));
    }
};


/* TOKEN */

client.login(TOKEN);