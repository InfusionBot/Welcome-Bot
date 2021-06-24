/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
module.exports = {
    name: "botperms",
    //description: "List of permissions given to bot",
    guildOnly: true,
    cooldown: 10,
    category: "Core",
    execute(message, args, guildDB) {
        const beautifyPerms = require("../../functions/beautifyPerms");
        let permsGiven = message.guild.me
            .permissionsIn(message.channel)
            .toArray();
        for (var i = 0; i < permsGiven.length; i++) {
            permsGiven[i] = Permissions.FLAGS[permsGiven[i]];
        }
        message.reply(
            `You have given: ${beautifyPerms(
                permsGiven,
                message.client.allPerms
            ).join(", ")}`
        );
    },
};
