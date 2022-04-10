require('dotenv').config();
const PREFIX = process.env.PREFIX;

module.exports = {
    name: 'echo',
    description: 'Echos your input.',
    usage: `${PREFIX}echo <message>`,

    async execute(message, args) {

        if (args = []) { args = 'Echo' };
        console.log(args);
        return message.reply(`(OLD) ${args}`);
    },
};