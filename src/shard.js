/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */

require("dotenv").config();
const { ShardingManager } = require("discord.js");
const manager = new ShardingManager(__dirname + "/bot.js", {
    token: process.env.DISCORD_TOKEN,
});

manager.on("shardCreate", (shard) => console.log(`[${String(new Date()).split(" ", 5).join(" ")}] || <==> || Launched shard #${shard.id}`));
manager.spawn({ amount: manager.totalShards, timeout: -1 });
