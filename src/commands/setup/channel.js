/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const updateGuild = require("../../db/functions/guild/updateGuild");
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
                        "modChannel",
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
                updateGuild(message.guild.id, "channel", "member-log");
                guildDB = await getGuild(message.guild.id);
                message.reply("Channel reset to `" + guildDB.channel + "`");
                break;
            case "resetmod":
                //Reset mod channel
                updateGuild(message.guild.id, "modChannel", "mod-log");
                guildDB = await getGuild(message.guild.id);
                message.reply(
                    "Mod Channel reset to `" + guildDB.modChannel + "`"
                );
                break;
            default:
                if (!args.length) {
                    //Get channel
                    message.reply(
                        "Welcome Channel currently is set to `" +
                            guildDB.channel +
                            "`"
                    );
                    //Get mod channel
                    message.reply(
                        "Mod Channel currently is set to `" +
                            guildDB.modChannel +
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
    }
};
