/* IMPORT */

const clr = require('colors');
const realDate = require('./realDate.js')

/* FUNCTION */

function msgAutoDelete(msg, delay) {

    if (!msg) console.log(realDate() + ` Guild: ${msg.guild.name}, ${msg.guild.id}\n >>> On msgAutoDelete: ` + clr.red(`'msg' is not declared`) + `!`);

    if (!delay) delay = 10 // delay of deleting

    delay += '000' // to milliseconds

    setTimeout(() => msg.delete().catch(err => {
        if (err.code !== 10008) {
            console.error(realDate() + ` Guild: ${msg.guild.name}, ${msg.guild.id}\n >>> On msgAutoDelete: ` + clr.red(`Failed to delete the message (code ${err.code})`) + `!`);
        }
    }), delay)

};

module.exports = msgAutoDelete;