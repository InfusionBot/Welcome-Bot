const Guild = require("../../schema/guildSchema");

module.exports = (guildId) => {
    return new Promise((resolve, reject) => {
        Guild.where({ guildId: guildId }).deleteOne((err) => {
            if (err) {
                return reject("Could not delete guild");
            } else {
                return resolve("Guild Deleted");
            }
        });
    });
};
