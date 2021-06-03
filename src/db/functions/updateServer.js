const Server = require("../../schema/serverSchema");

module.exports = (guildId, property, value) => {
    return new Promise((resolve, reject) => {
        Server.where({ guildId: guildId }).updateOne(
            { [property]: value },
            (err) => {
                if (err) {
                    return reject("Could not update server");
                } else {
                    return resolve("Server Updated");
                }
            }
        );
    });
};
