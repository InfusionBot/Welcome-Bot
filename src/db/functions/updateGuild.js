const Guild = require("../../schema/guildSchema");

module.exports = (guildId, property, value) => {
    return new Promise((resolve, reject) => {
        Guild.where({ guildId: guildId }).updateOne(
            { [property]: value },
            (err) => {
                if (err) {
                    return reject("Could not update guild");
                } else {
                    return resolve("Guild Updated");
                }
            }
        );
    });
};
