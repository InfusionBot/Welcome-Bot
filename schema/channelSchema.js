const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
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
        default: "Welcome {mention} to the {server} server",
    },
});

const Channel = new mongoose.model("Channel", channelSchema);

module.exports = Channel;
