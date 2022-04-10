require('dotenv').config();
const PREFIX = process.env.PREFIX;

module.exports = {
    name: 'ping',
    description: 'ping-pong!',
    usage: `${PREFIX}ping`,

    execute: async(message, args) => {
        await message.reply('(OLD) Pong!');
    },
};