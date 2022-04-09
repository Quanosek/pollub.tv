/* IMPORT */

require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });


/* HANDLERS */

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

['eventsHandler', 'interactionsHandler'].forEach(handler => {
    require(`./Handlers/${handler}`)(client, Discord);
});


/* TOKEN */

client.login(process.env.TOKEN);