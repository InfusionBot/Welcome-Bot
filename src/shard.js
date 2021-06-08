/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//This file will be used in future
const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./bot.js", { token: process.env.BOT_TOKEN });

manager.on("shardCreate", shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();
