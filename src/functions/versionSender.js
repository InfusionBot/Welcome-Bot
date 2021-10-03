/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const addVersion = require("../db/functions/version/addVersion");

module.exports = async (client) => {
    const newVersion = await addVersion(
        client.package.version,
        client.package.changelog
    );
    const Guild = client.guildSchema;
    if (newVersion) {
        //eslint-disable-next-line no-unused-vars
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
                if (
                    process.env.NODE_ENV === "production" &&
                    client.package.version.indexOf("dev") === -1
                ) {
                    const newsChannel = client.channels.cache.get(
                        client.config.channels.newsChannel
                    );
                    if (newsChannel) newsChannel.send(reply);
                    else
                        client.logger.log(
                            "No News Channel found to send version updates",
                            "error"
                        );
                }
            }
        });
        if (client.debug) client.logger.log("Version updated", "debug");
    }
};
