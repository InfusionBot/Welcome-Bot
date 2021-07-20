const addVersion = require("../db/functions/version/addVersion");
const getGuild = require("../db/functions/guild/getGuild");

module.exports = async (client) => {
    const newVersion = await addVersion(client.package.version, client.package.changelog);
    const Guild = client.guildSchema;
    if (newVersion) {
        Guild.where({}).find((err, guilds) => {
            if (err) {
                console.log(err);
            } else {
                let reply = `New Version: **${client.package.version}**`;
                client.package.changelog.forEach((change) => {
                    if (change.startsWith("**")) {
                        reply += `\n${change}`;
                    } else {
                        reply += `\n- ${change}`;
                    }
                });
                if (process.env.NODE_ENV === "production") {
                    const newsChannel = client.channels.cache.get(
                        client.config.newsChannelId
                    );
                    if (newsChannel) newsChannel.send(reply);
                    else
                        client.logger.log(
                            "NODE_ENV is in production and bot can't find newsChannel to send version updates",
                            "error"
                        );
                }
            }
        });
        client.logger.log("Version updated", "debug");
    }
};
