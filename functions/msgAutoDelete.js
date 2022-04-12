/* IMPORT */

const clr = require('colors');
const realDate = require('./realDate.js')

/* FUNCTION */

function msgAutoDelete(msg, delay) {

    if (!msg) console.log(realDate() + ` Guild: ${msg.guild.name}, ${msg.guild.id}\n >>> On msgAutoDelete: ` + clr.red('Message is not declared.'));

    if (!delay) delay = 10 // delay of deleting

    delay += '000' // to milliseconds

    let msgDelete;

    if (msg.type === 'APPLICATION_COMMAND') {
        console.log('APPLICATION_COMMAND');
        msgDelete = msg.deleteReply();
    };
    if (msg.type === 'DEFAULT') {
        console.log('DEFAULT');
        msgDelete = msg.delete();
    };

    //return console.log({ msgDelete });

    setTimeout(() => msg.delete().catch(err => {
        if (err.code !== 10008) {
            console.error(realDate() + ` Guild: ${msg.guild.name}, ${msg.guild.id}\n >>> On msgAutoDelete: ` + clr.red(`Failed to delete the message (code: ${err.code}).`));
        }
    }), delay)

    console.log('done')

};

module.exports = msgAutoDelete;