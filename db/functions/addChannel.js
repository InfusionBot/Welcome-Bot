const Channel = require("../../schema/channelSchema");

module.exports = (guildId, welcomeChannel) => {
    return new Promise((resolve, reject) => {
        let channel = new Channel({
            guildId: guildId,
            welcomeChannel: welcomeChannel,
        });

        channel.save((err) => {
            if (err) {
                console.log(err);
                return reject("Could Not Save Channel");
            } else {
                return resolve(channel);
            }
        });
    });
};
