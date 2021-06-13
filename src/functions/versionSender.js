const Guild = require("../schema/guildSchema");

const addVersion = require("../db/functions/version/addVersion");

module.exports = async (client) => {
    const newVersion = await addVersion(client.botVersion, client.changelog);
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
                guilds.forEach((guild) => {
                    if (guild.unsubscribe) {
                        let clientGuild = client.guilds.cache.get(
                            guild.guildId
                        );
                        let systemChanel = clientGuild.systemChannelID;
                        clientGuild.channels.cache
                            .get(systemChanel)
                            .send(reply);
                    }
                });
            }
        });
        console.log("Version updated");
    }
};
