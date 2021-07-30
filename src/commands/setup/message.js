/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "message",
                aliases: ["msg"],
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [],
                requirements: {
                    subcommand: false,
                    guildOnly: true,
                },
                usage: "(subcommand)",
                subcommands: [
                    { name: "set", desc: "Set Welcome message" },
                    { name: "reset", desc: "Reset Welcome message" },
                ],
                disabled: false,
                cooldown: 10,
                category: "Setup",
            },
            client
        );
    }

    async execute({ message, args, guildDB }, t) {
        const getGuild = require("../../db/functions/guild/getGuild");
        const subcommand = args[0] ? args[0].toLowerCase() : "";
        const message2 = args.join(" ").replace(`${args[0]} `, "");
        switch (subcommand) {
            case "set":
                //Set welcome message
                if (args[1]) {
                    guildDB.plugins.welcome.message = message2;
                    message.reply(
                        "Welcome message set to ```\n" + message2 + "\n```"
                    );
                } else {
                    message.reply(
                        "Please supply valid value for setting message."
                    );
                }
                break;
            case "reset":
                guildDB.plugins.welcome.message =
                    "Welcome {mention} to the {server} server!\nYou are our #{members_formatted} member";
                message.reply(
                    "Message reset to ```\n" +
                        guildDB.plugins.welcome.message +
                        "\n```"
                );
                break;
            case "get":
            default:
                //Get welcome channel
                message.reply(
                    "Message currently is set to ```\n" +
                        guildDB.plugins.welcome.message +
                        "\n```"
                );
                break;
        }
        await guildDB.save();
    }
};
