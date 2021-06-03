const Server = require("../../schema/serverSchema");

module.exports = (guildId) => {
    return new Promise((resolve, reject) => {
        Server.where({ guildId: guildId }).deleteOne((err) => {
            if (err) {
                return reject("Could not delete server");
            } else {
                return resolve("Server Deleted");
            }
        });
    });
};
