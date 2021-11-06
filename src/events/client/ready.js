/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const dbAuditor = require("../../db/functions/dbAuditor");
const clock = require("date-events")();
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        // "ready" isn't really ready. We need to wait a spell.
        await client.wait(1000);
        // We logged in
        if (client.debug)
            client.logger.log(
                `${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`
            );
        const presence = require("../../functions/presence");
        const serverCount = require("../../functions/serverCount");
        const startDash = (c) => {
            if (c.config.dashboard.enabled) {
                c.dashboard.load(c);
            } else {
                client.logger.debug("Dashboard disabled");
            }
        };
        client.shard
            ? client.shard.broadcastEval(startDash, { shard: 0 })
            : startDash(client);
        presence(client);
        // 1 * 60 * (1 second)
        // Update presence every 1 minute
        setInterval(() => presence(client), 1 * 60 * 1000);
        // Update server count every 25 minutes
        if (process.env.NODE_ENV === "production")
            setInterval(() => serverCount(client), 25 * 60 * 1000);
        dbAuditor(client);
        //Run dbAuditor every 3 hours
        if (process.env.NODE_ENV === "production")
            setInterval(() => {
                dbAuditor(client);
            }, 3 * 60 * 60 * 1000);
        require("../../functions/versionSender")(client);
        if (process.env.NODE_ENV !== "production")
            require("../../helpers/updateDocs")(client);
        client.manager.init(client.user.id);
        client.logger.log(`Welcome-Bot v${client.package.version} started!`);
        /*//Invite tracking
        client.invites = new Map();
        client.guilds.cache.each((guild) => {
            //on bot start, fetch all guilds and fetch all invites to store
            if (guild.me.permissions.has("MANAGE_GUILD")) {
                //without manage guild we can't fetch invites :(
                guild.invites
                    .fetch()
                    .then((guildInvites) => {
                        client.invites.set(
                            guild.id,
                            new Map(guildInvites.map((inv) => inv.uses))
                        );
                    })
                    .catch(() => {});
            }
        });*/
        clock.on("hour", () => {
            client.models.User.find({}, (err, users) => {
                if (err) console.log(err);
                if (users) {
                    users.forEach(async (userDB) => {
                        const user = await client.users.fetch(userDB.userId);
                        let diff;
                        if (userDB.daily < 0) {
                            diff =
                                2 * 24 * 60 * 60 * 1000 -
                                (new Date().getTime() - userDB.daily); //2 days
                            if (diff < 0) {
                                console.log(
                                    `Resetting daily multiplier for ${user.tag} (${user.id})`
                                );
                                userDB.multiplier.daily = 0;
                            }
                        }
                        if (userDB.weekly < 0) {
                            diff =
                                14 * 24 * 60 * 60 * 1000 -
                                (new Date().getTime() - userDB.weekly); //14 days
                            if (diff < 0) {
                                console.log(
                                    `Resetting weekly multiplier for ${user.tag} (${user.id})`
                                );
                                userDB.multiplier.weekly = 0;
                            }
                        }
                        await userDB.save();
                    });
                }
            });
        });
    },
};
