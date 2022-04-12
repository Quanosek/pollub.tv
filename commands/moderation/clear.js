/* COMMAND */

module.exports = {
    name: 'clear',
    aliases: ['c', 'delete', 'del'],
    description: 'Usuwa określoną liczbę wiadomości z kanału.',
    userPermissions: 'MANAGE_MESSAGES',

    async run(client, msg, args) {
        return console.log('delete');
    },
};