require('dotenv').config();
const PREFIX = process.env.PREFIX;

module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    usage: `${PREFIX}ping`,

    async execute(message, args) {
        await message.reply('(OLD) Pong!');
    },
};