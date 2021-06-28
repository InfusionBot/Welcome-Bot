/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const https = require("https");
const sendReq = function (data, options) {
    const req = https
        .request(options, (res) => {
            console.log("statusCode: ", res.statusCode);
        })
        .on("error", (err) => {
            console.error(err.message);
        });

    req.write(data);
    req.end();
};
module.exports = function (client) {
    const servers = client.guilds.cache.size;
    client.logger.log(`Updating server count. Servers: ${servers}`, "debug");

    let data;
    let options;

    if (process.env.DISCORD_BOATS_token) {
        data = JSON.stringify({
            server_count: servers,
        });
        options = {
            hostname: "discord.boats",
            path: "/api/bot/" + process.env.BOT_ID,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.DISCORD_BOATS_token,
                "User-Agent": process.env.userAgent,
            },
        };
        sendReq(data, options);
    } else {
        client.logger.log("DISCORD_BOATS_token is not set", "warn");
    }

    if (process.env.DELAPI_token) {
        data = JSON.stringify({
            guildCount: servers,
        });
        options = {
            hostname: "api.discordextremelist.xyz",
            path: "/v2/bot/" + process.env.BOT_ID + "/stats",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.DELAPI_token,
                "User-Agent": process.env.userAgent,
            },
        };
        sendReq(data, options);
    } else {
        client.logger.log("DELAPI_token is not set", "warn");
    }

    if (process.env.DISCORD_BOTS_token) {
        data = JSON.stringify({
            guildCount: servers,
        });
        options = {
            hostname: "discord.bots.gg",
            path: "/api/v1/bots/" + process.env.BOT_ID + "/stats",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.DISCORD_BOTS_token,
                "User-Agent": process.env.userAgent,
            },
        };
        sendReq(data, options);
    } else {
        client.logger.log("DISCORD_BOTS_token is not set", "warn");
    }

    if (process.env.DISCORDLIST_token) {
        data = JSON.stringify({
            server_count: servers,
        });
        options = {
            hostname: "api.discordlist.space",
            path: "/v1/bots/" + process.env.BOT_ID,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.DISCORDLIST_token,
                "User-Agent": process.env.userAgent,
            },
        };
        sendReq(data, options);
    } else {
        client.logger.log("DISCORDLIST_token is not set", "warn");
    }
};
