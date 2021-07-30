/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const getGuild = require("../../db/functions/guild/getGuild");
const { channelIdFromMention } = require("../../helpers/Util.js");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "channel",
                aliases: ["chan"],
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [],
                requirements: {
                    subcommand: false,
                    guildOnly: true,
                },
                usage: "(subcommand)",
                subcommands: [
                    { name: "set", desc: "Set Welcome channel" },
                    { name: "setMod", desc: "Set Moderation channel" },
                    { name: "reset", desc: "Reset Welcome channel" },
                    { name: "resetMod", desc: "Reset Moderation channel" },
                ],
                disabled: false,
                cooldown: 10,
                category: "Setup",
            },
            client
        );
    }

    async execute({ message, args, guildDB }, t) {
        const subcommand = args[0] ? args[0].toLowerCase() : "";
        let channel = args
            .join(" ")
            .replace(`${args[0] ?? ""} `, "")
            .replace(" ", ""); //replace empty space as there is no empty space in a channel name
        switch (subcommand) {
            case "set":
                if (args[1]) {
                    if (args[1].startsWith("<#") && isNaN(parseInt(args[1]))) {
                        channel = channelIdFromMention(args[1]);
                    }
                    guildDB.plugins.welcome.channel = channel;
                    message.reply(`Welcome Channel set to \`${channel}\``);
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
                    guildDB.plugins.modlogs = channel;
                    message.reply(`ModLogs Channel set to \`${channel}\``);
                } else {
                    message.reply(
                        "Please supply valid value for setting mod channel."
                    );
                }
                break;
            case "reset":
                //Reset channel
                guildDB.plugins.welcome.channel = "member-log";
                message.reply("Channel reset to `" + guildDB.channel + "`");
                break;
            case "resetmod":
                //Reset mod channel
                guildDB.plugins.modlogs = "mod-log";
                message.reply(
                    "Mod Channel reset to `" + guildDB.modChannel + "`"
                );
                break;
            default:
                if (!args.length) {
                    //Get channel
                    message.reply(
                        "Welcome Channel currently is set to `" +
                            guildDB.plugins.welcome.channel +
                            "`"
                    );
                    //Get mod channel
                    message.reply(
                        "Mod Channel currently is set to `" +
                            guildDB.plugins.modlogs +
                            "`"
                    );
                } else {
                    message.reply(
                        t("cmds:channel.invalidArgs") +
                            `${guildDB.prefix}help channel`
                    );
                }
                break;
        }
        await guildDB.save();
    }
};
