const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({ intents: 32767 });

client.on('ready', () => {
    console.log('Bot is online!');
})

client.on('messageCreate', (msg) => {
    const prefix = process.env.PREFIX;
    if (!msg.content.startsWith(prefix)) return;

    if (msg.content === `${prefix}test`) {
        msg.channel.send('Your test has worked!')
    }
})

client.login(process.env.DISCORD_TOKEN);