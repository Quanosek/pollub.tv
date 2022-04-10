require('dotenv').config();
const PREFIX = process.env.PREFIX;

module.exports = {
    name: 'test',
    description: 'test',
    usage: `${PREFIX}test`,

    async execute(message, args) {
        await message.channel.send('Test!');
    },
};