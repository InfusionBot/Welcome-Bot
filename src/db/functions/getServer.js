const Server = require("../../schema/serverSchema");

module.exports = (guildId) => {
    return new Promise((resolve, reject) => {
        Server.where({ guildId: guildId }).findOne((err, server) => {
            if (err) {
                return reject("Error finding server");
            } else if (server) {
                return resolve(server);
            } else {
                return reject("No server with guild ID " + guildId);
            }
        });
    });
};
