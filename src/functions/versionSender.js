const addVersion = require("../db/functions/version/addVersion");
const getGuild = require("../db/functions/guild/getGuild");

module.exports = async (client) => {
    const newVersion = await addVersion(client.botVersion, client.changelog);
    const Guild = client.guildSchema;
    if (newVersion) {
        Guild.where({}).find((err, guilds) => {
            if (err) {
                console.log(err);
            } else {
                let reply = `New Version: **${client.botVersion}**`;
                client.changelog.forEach((change) => {
                    if (change.startsWith("**")) {
                        reply += `\n${change}`;
                    } else {
                        reply += `\n- ${change}`;
                    }
                });
                if (process.env.NODE_ENV === "production") {
                const newsChannel = client.channels.cache.get(client.newsChannelId);
                if (newsChannel)
                    newsChannel.send(reply);
                else
                    client.logger.log("NODE_ENV is in production and bot can't find newsChannel to send version updates");
                }

                guilds.forEach((guild) => {
                    if (guild.subscribed) {
                        let clientGuild = client.guilds.cache.get(
                            guild.guildId
                        );

                        reply += `\n\nIf you want to unsubscribe from these version updates, send \`${guild.prefix} version unsubscribe\``;

                        let systemChanel = clientGuild.systemChannelID;

                        clientGuild.channels.cache
                            .get(systemChanel)
                            .send(reply);
                    }
                });
            }
        });
        client.logger.log("Version updated", "debug");
    }
};
