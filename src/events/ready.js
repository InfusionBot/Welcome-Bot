/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const dbAuditor = require("./db/functions/dbAuditor");
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        // We logged in
        if (client.debug)
            client.logger.log(
                `${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`
            );
        const presence = require("../functions/presence");
        const serverCount = require("../functions/serverCount");
        await require("../loaders/Locale.js")(this);
        if (this.config.dashboard.enabled) this.dashboard.load(this);
        else this.logger.log("Dashboard not enabled", "debug");
        this.loadCommands(__dirname + "/commands");
        presence(this);
        if (process.env.NODE_ENV === "production") serverCount(this);
        // 1 * 60 * (1 second)
        // Update presence every 1 minute
        setInterval(() => presence(this), 1 * 60 * 1000);
        // Update server count every 25 minutes if environment is in PRODUCTION
        if (process.env.NODE_ENV === "production")
            setInterval(() => serverCount(this), 25 * 60 * 1000);
        dbAuditor(this);
        //Run dbAuditor every 3 hours
        setInterval(() => {
            dbAuditor(this);
        }, 3 * 60 * 60 * 1000);
        require("../functions/versionSender")(this);
        if (process.env.NODE_ENV !== "production")
            require("./helpers/updateDocs")(this);
        this.logger.log(`Welcome-Bot v${this.package.version} started!`);
    },
};
