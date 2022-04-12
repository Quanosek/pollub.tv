/* IMPORT */

const clr = require('colors');
const realDate = require('./realDate.js')

/* FUNCTION */

function interactionAutoDelete(interaction, delay) {

    if (!delay) delay = 10 // delay of deleting

    delay += '000' // to milliseconds

    if (interaction.type === 'APPLICATION_COMMAND') console.log('APPLICATION_COMMAND');
    if (interaction.type === 'DEFAULT') console.log('DEFAULT');

    setTimeout(() => interaction.deleteReply().catch(err => {
        if (err.code !== 10008) {
            console.error(realDate() + ` Guild: ${interaction.guild.name}, ${interaction.guild.id}\n >>> On interactionAutoDelete: ` + clr.red(`Failed to delete the message (code: ${err.code}).`));
        }
    }), delay)

};

module.exports = interactionAutoDelete;