/** IMPORT */

const { Schema, model } = require('mongoose');

/** SCHEMA */

const schema = new Schema({

    guildName: String,
    guildId: String,
    prefix: String,

});

module.exports = model('guilds', schema);