/* COMMAND */

module.exports = {
    name: 'delete',
    aliases: ['del', 'clear', 'c'],
    description: 'Pomoc wszelaka!',
    userPermission: ["MANAGE_MESSAGES"],

    async run(client, msg, args) {
        return console.log('delete');
    },
};