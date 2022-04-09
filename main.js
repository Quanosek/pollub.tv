/* IMPORT */

require('dotenv').config();
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });

const TOKEN = process.env.TOKEN;


/* COMMANDS HANDLER */

const prefix = process.env.PREFIX;
const commands = [];

client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands')

for (const folder of commandFolders) {

    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    }
};


/* EVENTS */

client.once('ready', () => {
    console.log('Bot is online!');
    client.user.setActivity('?help', { type: 'LISTENING' });

    const CLIENT_ID = client.user.id;

    const rest = new REST({ version: '9' }).setToken(TOKEN);

    (async() => {
        try {
            if (process.env.ENV === 'production') {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                })
                console.log('Successfully registered commands globally.');
            } else {
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                    body: commands
                })
                console.log('Successfully registered commands localy.');
            };
        } catch (err) {
            if (err) console.error(err);
        }
    })();
});

client.on('messageCreate', async msg => {

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLocaleLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(msg, args);
    } catch (err) {
        if (err) console.error(err);
    }
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) returnValue

    try {
        await command.execute(interaction);
    } catch (err) {
        if (err) console.error(err);

        await interaction.reply({
            content: 'Ta komenda nie działa prawidłowo.',
            ephemeral: true
        });
    }
});


/* TOKEN */

client.login(TOKEN);