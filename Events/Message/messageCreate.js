const Prefix = process.env.PREFIX;

module.exports = {
    name: 'messageCreate',

    async execute(message, client, Discord) {
        if (!message.content.startsWith(Prefix) ||
            message.author.bot ||
            message.channel.type == 'DM'
        ) return;

        const args = message.content.slice(Prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);

        if (!(client.commands.has(commandName) || command)) return;

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!(authorPerms.has(command.permissions) || authorPerms)) {
                const NoPerms = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription('You do now have required permissions to run this command!');
                message.channel.send({ embeds: [NoPerms] })
                    .then((sent) => {
                        setTimeout(() => {
                            sent.delete();
                        }, 2000);
                    })
            }
        }

        const { cooldowns } = client;
        if (!cooldowns.has(command.name)) { cooldowns.set(command.name, new Discord.Collection()) };

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                const timeLeftEmbed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription(`Please wait another ${timeLeft.toFixed(1)} more seconds to be able to run this command again!`);
                return message.channel.send({ embeds: [timeLeftEmbed] })
                    .then((sent) => {
                        setTimeout(() => {
                            sent.delete();
                        }, 2000);
                    })
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            command.execute(message, args, commandName, client, Discord);
        } catch (error) {
            console.error(error);
            const ErrorEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('An Error happened while trying to run this command, chceck console for more details.');
            message.channel.send({ embeds: [ErrorEmbed] })
        }
    }
};