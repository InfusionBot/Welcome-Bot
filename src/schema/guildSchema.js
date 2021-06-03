const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,
        required: true,
        default: "!w",
    },
    welcomeChannel: {
        type: String,
    },
    welcomeMessage: {
        type: String,
        required: true,
        default: "Welcome {mention} to the {server} guild",
    },
});

const Guild = new mongoose.model("Guild", guildSchema);

module.exports = Guild;
