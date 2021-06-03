const Guild = require("../../schema/guildSchema");

module.exports = (guildId) => {
    return new Promise((resolve, reject) => {
        Guild.where({ guildId: guildId }).findOne((err, guild) => {
            if (err) {
                return reject("Error finding guild");
            } else if (guild) {
                return resolve(guild);
            } else {
                return reject("No guild with guild ID " + guildId);
            }
        });
    });
};
