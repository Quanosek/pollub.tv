require('dotenv').config();
const PREFIX = process.env.PREFIX;

module.exports = {
    name: 'messageCreate',

    async execute(message, client) {
        if (!message.content.startsWith(PREFIX) ||
            message.author.bot
        ) return;

        const args = message.content.slice(PREFIX.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);

        try {
            await command.execute(message, args);
        } catch (err) {
            if (err) {
                console.error(err);
                message.reply('There was an error while executing this command!');
            };
        };
    },
};