/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const dbAuditor = require("../db/functions/dbAuditor");
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        // We logged in
        if (client.debug)
            client.logger.log(
                `${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`
            );
        const cron = require("node-cron");
        cron.schedule("0 0 */12 * * *", () => {
            client.channels.cache
                .get(`${client.config.channels.general}`)
                .send(`<@&${client.config.roles.voteReminder}> Time to vote! Use vote command`);
        });
        const presence = require("../functions/presence");
        const serverCount = require("../functions/serverCount");
        if (client.config.dashboard.enabled) client.dashboard.load(client);
        else client.logger.log("Dashboard not enabled", "debug");
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
        require("../functions/versionSender")(client);
        if (process.env.NODE_ENV !== "production")
            require("../helpers/updateDocs")(client);
        client.logger.log(`Welcome-Bot v${client.package.version} started!`);
    },
};
