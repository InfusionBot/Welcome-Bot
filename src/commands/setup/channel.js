/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
module.exports = {
    name: "channel",
    aliases: ["chan"],
    //description:
    //"Manage channel settings for this server\nNot providing any arguments will display the current settings.",
    permissions: [Permissions.FLAGS.MANAGE_GUILD],
    subcommand: false,
    subcommands: [
        { name: "set", desc: "Set Welcome channel" },
        { name: "setMod", desc: "Set Moderation channel" },
        { name: "reset", desc: "Reset Welcome channel" },
        { name: "resetMod", desc: "Reset Moderation channel" },
    ],
    cooldown: 10,
    guildOnly: true,
    category: "Setup",
    async execute(message, args, guildDB) {
        const updateGuild = require("../../db/functions/guild/updateGuild");
        const getGuild = require("../../db/functions/guild/getGuild");
        const { channelIdFromMention } = require("../../functions/get.js");
        let subcommand = args[0] ? args[0].toLowerCase() : "";
        switch (subcommand) {
            case "set":
                if (args[1]) {
                    if (args[1].startsWith("<#") && isNaN(parseInt(args[1]))) {
                        args[1] = channelIdFromMention(args[1]);
                    }
                    //Set channel
                    updateGuild(
                        message.guild.id,
                        "channel",
                        args
                            .join(" ")
                            .replace(`${args[0]} `, "")
                            .replace(" ", "")
                    ); //replace(" ", "") to replace empty space, there is no empty space in a channel name
                    message.reply(
                        "Welcome Channel set to `" +
                            args
                                .join(" ")
                                .replace(`${args[0]} `, "")
                                .replace(" ", "") +
                            "`"
                    );
                } else {
                    message.reply(
                        "Please supply valid value for setting channel."
                    );
                }
                break;
            case "setmod":
                if (args[1]) {
                    if (args[1].startsWith("<#") && isNaN(parseInt(args[1]))) {
                        args[1] = channelIdFromMention(args[1]);
                    }
                    //Set mod channel
                    updateGuild(
                        message.guild.id,
                        "modLogChan",
                        args
                            .join(" ")
                            .replace(`${args[0]} `, "")
                            .replace(" ", "")
                    ); //replace(" ", "") to replace empty space, there is no empty space in a channel name
                    message.reply(
                        "Mod Channel set to `" +
                            args
                                .join(" ")
                                .replace(`${args[0]} `, "")
                                .replace(" ", "") +
                            "`"
                    );
                } else {
                    message.reply(
                        "Please supply valid value for setting mod channel."
                    );
                }
                break;
            case "reset":
                //Reset channel
                updateGuild(message.guild.id, "channel", "new-members");
                guildDB = await getGuild(message.guild.id);
                message.reply("Channel reset to `" + guildDB.channel + "`");
                break;
            case "resetmod":
                //Reset mod channel
                updateGuild(message.guild.id, "modLogChan", "mod-log");
                guildDB = await getGuild(message.guild.id);
                message.reply(
                    "Mod Channel reset to `" + guildDB.modLogChan + "`"
                );
                break;
            case "get":
                //Get channel
                message.reply(
                    "Welcome Channel currently is set to `" +
                        guildDB.channel +
                        "`"
                );
                break;
            case "getmod":
                //Get mod channel
                message.reply(
                    "Mod Channel currently is set to `" +
                        guildDB.modLogChan +
                        "`"
                );
                break;
            default:
                //Get channel
                message.reply(
                    "Welcome Channel currently is set to `" +
                        guildDB.channel +
                        "`"
                );
                //Get mod channel
                message.reply(
                    "Mod Channel currently is set to `" +
                        guildDB.modLogChan +
                        "`"
                );
                break;
        }
    },
};
