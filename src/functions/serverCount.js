/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const https = require("https");
const TopggAPI = require("../classes/Topgg").api;
const sendReq = function (data, options) {
    const req = https
        .request(options, (res) => {
            console.log(
                `Status Code for ${options.hostname}: `,
                res.statusCode
            );
        })
        .on("error", (err) => {
            console.error(err.message);
        });

    req.write(data);
    req.end();
};
module.exports = async (client) => {
    let servers = client.guilds.cache.size;
    if (client.shard) {
        servers = (
            await client.shard.fetchClientValues("guilds.cache.size")
        ).reduce((acc, guildCount) => acc + guildCount, 0);
    }
    const shards = client.shard ? client.shard.count : 0;
    client.logger.log(`Updating server count. Servers: ${servers}`, "debug");

    let data;
    let options;

    if (process.env.DISCORD_BOATS_token) {
        data = JSON.stringify({
            server_count: servers,
        });
        options = {
            hostname: "discord.boats",
            path: "/api/bot/" + client.user.id,
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
            path: "/v2/bot/" + client.user.id + "/stats",
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
            path: "/api/v1/bots/" + client.user.id + "/stats",
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
            path: "/v1/bots/" + client.user.id,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bot ${process.env.DISCORDLIST_token}`,
                "User-Agent": process.env.userAgent,
            },
        };
        sendReq(data, options);
    } else {
        client.logger.log("DISCORDLIST_token is not set", "warn");
    }

    if (process.env.DISSERVNET_token) {
        data = JSON.stringify({
            servers,
            shards: 0,
        });
        options = {
            hostname: "api.discordservices.net",
            path: "/bot/" + client.user.id + "/stats",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.DISSERVNET_token,
                "User-Agent": process.env.userAgent,
            },
        };
        sendReq(data, options);
    } else {
        client.logger.log("DISSERVNET_token is not set", "warn");
    }

    if (process.env.DISBOTLIST_token) {
        data = JSON.stringify({
            ServerCount: servers,
            ShardCount: 0,
        });
        options = {
            hostname: "disbotlist.xyz",
            path: "/api/bots/stats",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.DISBOTLIST_token,
                "User-Agent": process.env.userAgent,
            },
        };
        sendReq(data, options);
    } else {
        client.logger.log("DISBOTLIST_token is not set", "warn");
    }

    if (TopggAPI) {
        //Top.gg stats
        TopggAPI.postStats({
            serverCount: servers,
            shardCount: shards,
        })
            .then(() => {
                if (client.debug) console.log("Posted stats to Topgg");
            })
            .catch(console.error);
    }
};
