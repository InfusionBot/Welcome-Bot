const Guild = require("../../schema/guildSchema");

module.exports = (guildId, welcomeChannel) => {
    return new Promise((resolve, reject) => {
        let guild = new Guild({
            guildId: guildId,
            welcomeChannel: welcomeChannel,
        });

        guild.save((err) => {
            if (err) {
                console.log(err);
                return reject("Could Not Save Guild");
            } else {
                return resolve(guild);
            }
        });
    });
};
