/* COMMAND */

module.exports = {
    name: 'delete',
    aliases: ['d', 'clear', 'c'],
    description: 'Usuwa określoną liczbę wiadomości z kanału.',
    userPermissions: 'MANAGE_MESSAGES',

    async run(client, msg, args) {
        console.log('delete')
    },
};