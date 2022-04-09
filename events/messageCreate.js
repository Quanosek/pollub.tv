/*
const prefix = process.env.PREFIX;

module.exports = {
    name: 'messageCreate',

    async execute(client, msg) {
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
    }
};
*/