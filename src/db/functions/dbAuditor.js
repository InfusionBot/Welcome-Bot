/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = async (client) => {
    /*
    const Guild = client.models.Guild;
    let actualGuilds = client.shard
        ? await client.shard.broadcastEval((c) =>
              c.guilds.cache.map((g) => g.id)
          )
        : client.guilds.cache.map((g) => g.id);
    if (client.shard) {
        actualGuilds = [].concat(...actualGuilds);
    }
    Guild.where({}).find((err, guilds) => {
        if (err) {
            console.log(err);
        } else {
            const guildIdArray = guilds.map((guild) => guild.guildId);
            guildIdArray.forEach((guildId) => {
                if (!actualGuilds.includes(guildId)) {
                    client.db.deleteGuild(guildId);
                }
            });

            actualGuilds.forEach((guildId) => {
                if (!guildIdArray.includes(guildId)) {
                    client.db.findOrCreateGuild(guildId);
                }
            });
        }
    });
    console.log("Database audited");*/
    console.log("Database auditor is disabled ;-;");
};
