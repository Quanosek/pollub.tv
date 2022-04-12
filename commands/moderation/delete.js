/* COMMAND */

module.exports = {
    name: 'delete',
    aliases: ['del', 'clear', 'c'],
    description: 'Usuwa określoną liczbę wiadomości z kanału.',
    userPermission: ["MANAGE_MESSAGES"],

    async run(client, msg, args) {
        return console.log('delete');
    },
};