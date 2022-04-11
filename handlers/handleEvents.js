/* EVENTS HANDLER */

module.exports = (client) => {
    client.handleEvents = async(eventFiles, path) => {

        for (const file of eventFiles) {

            const event = require(`../events/${file}`);

            if (event.once) { // once event
                client.once(event.name, (...args) => event.execute(...args, client));
            } else { // on event
                client.on(event.name, (...args) => event.execute(...args, client));
            };

        };

    };
};