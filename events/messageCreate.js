/* IMPORT & DEFINE */

require('dotenv').config();
const PREFIX = process.env.PREFIX;

/* (OLD) MESSAGE CREATE EVENT */

module.exports = {
    name: 'messageCreate',

    async execute(message, client) {
        if (!message.content.startsWith(PREFIX) ||
            message.author.bot
        ) return;

        const args = message.content.slice(PREFIX.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase();

        if (!client.commands.has('old' + commandName)) return;

        const command = client.commands.get('old' + commandName); // define new name in Colection

        console.log(command);

        try {
            if (command.data) return; // reject interaction commands
            await command.execute(message, args); // create (OLD) command
        } catch (err) { // error
            if (err) {
                console.error(err);
                message.reply('There was an error while executing this command!');
            };
        };
    },
};