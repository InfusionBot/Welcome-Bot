/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
module.exports = {
    name: "lang",
    aliases: ["language", "changelang", "getlang"],
    description: "Change language",
    permissions: [Permissions.FLAGS.MANAGE_GUILD],
    args: false,
    guildOnly: true,
    usage: "(subcommand) (lang)",
    subcommand: false,
    subcommands: [
        { name: "list", desc: "List of all languages available" },
        { name: "set", desc: "Set language" },
    ],
    cooldown: 5,
    category: "Setup",
    execute(message, args, guildDB, t) {
        const updateGuild = require("../../db/functions/guild/updateGuild");
        const list = require(`../../locales/${guildDB.lang}/languages.json`);
        let str = "";
        for (const l in list) {
            str += `\`${l}\` - ${list[l]}\n`;
        }
        switch (args[0]) {
            case "set":
                if (!Object.keys(list).includes(args[0]))
                    return message.reply(
                        `Invalid locale, send \`${guildDB.prefix}lang list\` to get a list of locales available.`
                    );
                updateGuild(message.guild.id, "lang", args[0]);
                return message.reply(`Language set to ${args[0]}`);
                break;
            case "list":
                return message.reply(str);
                break;
            default:
                message.reply(`Language is currently set to ${guildDB.lang}`);
                break;
        }
    },
};
