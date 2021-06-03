const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
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

const Server = new mongoose.model("Server", serverSchema);

module.exports = Server;
