/* READY EVENT */

module.exports = {
    name: 'ready',
    once: true, // only once

    async execute(client) {
        console.log('Bot is ready!'); // ready message

        client.user.setActivity('/help', { type: 'PLAYING' }); // bot activity
    },
};