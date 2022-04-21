/** IMPORT */

const { Schema, model } = require('mongoose');

/** SCHEMA */

const prefixSchema = new Schema({

    guildId: {
        type: String,
        unique: true,
        required: true,
    },
    prefix: String,

});

module.exports = model("guildConfigs", prefixSchema);