/* IMPORT */

const clr = require('colors');
const realDate = require('./realDate.js')

/* FUNCTION */

function autoDelete(msg, delay) {

    if (!msg) console.log(realDate() + ` Guild: ${msg.guild.name}, ${msg.guild.id}\n >>> On msgAutoDelete: ` + clr.red('Message is not declared.'));

    if (!delay) delay = 10 // delay of deleting

    delay += '000' // to milliseconds

    if (msg.type === 'APPLICATION_COMMAND') { // if slash commands

        setTimeout(() => msg.deleteReply().catch(err => {
            if (err.code !== 10008) {
                console.error(realDate() + ` Guild: ${msg.guild.name}, ${msg.guild.id}\n >>> On msgAutoDelete: ` + clr.red(`Failed to delete the message (code: ${err.code}).`));
            }
        }), delay)

    };

    if (msg.type === 'DEFAULT') { // if (old) commands

        setTimeout(() => msg.delete().catch(err => {
            if (err.code !== 10008) {
                console.error(realDate() + ` Guild: ${msg.guild.name}, ${msg.guild.id}\n >>> On msgAutoDelete: ` + clr.red(`Failed to delete the message (code: ${err.code}).`));
            }
        }), delay)

    };

};

module.exports = autoDelete;