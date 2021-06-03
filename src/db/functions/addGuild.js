const Guild = require("../../schema/guildSchema");

module.exports = (guildId) => {
    return new Promise((resolve, reject) => {
        let guild = new Guild({
            guildId: guildId,
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
