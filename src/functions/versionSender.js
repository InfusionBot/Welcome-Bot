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
        console.log("Version updated");
    }
};
