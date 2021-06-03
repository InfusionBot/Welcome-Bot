const Server = require("../../schema/serverSchema");

module.exports = (guildId, welcomeChannel) => {
    return new Promise((resolve, reject) => {
        let server = new Server({
            guildId: guildId,
            welcomeChannel: welcomeChannel,
        });

        server.save((err) => {
            if (err) {
                console.log(err);
                return reject("Could Not Save Server");
            } else {
                return resolve(server);
            }
        });
    });
};
