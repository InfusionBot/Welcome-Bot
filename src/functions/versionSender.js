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
                let msg = `New Version: **${client.botVersion}**`;
                client.changelog.forEach((change) => {
                    if (change.startsWith("**")) {
                        reply += `\n${change}`;
                    } else {
                        reply += `\n- ${change}`;
                    }
                });
                let guildDB;
                guilds.forEach((guild) => {
                    if (!guild.unsubscribed) {
                        let clientGuild = client.guilds.cache.get(
                            guild.guildId
                        );
                        guildDB = getGuild(guild.guildId);
                        let reply = msg + `\n\nIf you want to unsubscribe from these version updates, send \`${guildDB.prefix}version unsubscribe\``;
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
