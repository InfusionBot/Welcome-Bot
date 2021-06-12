const Guild = require("../schema/guildSchema");

const addVersion = require("../db/functions/version/addVersion");

module.exports = async (client) => {
    const newVersion = await addVersion(client.botVersion, client.changelog);
    if (newVersion) {
        Guild.where({}).find((err, guilds) => {
            if (err) {
                console.log(err);
            } else {
                let reply = `New Version: **v${client.botVersion}**`;
                client.changelog.forEach((change) => {
                    reply += `\n- ${change}`;
                });
                guilds.forEach((guild) => {
                    client.guilds.cache
                        .get(guild.guildId)
                        .channels.cache.find(
                            (channel) => channel.name === "general"
                        )
                        .send(reply);
                    console.log("done");
                });
            }
        });
    }
};
