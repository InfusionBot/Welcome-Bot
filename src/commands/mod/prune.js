/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
// eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { Permissions } = require("discord.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "prune",
                aliases: ["purge"],
                memberPerms: [Permissions.FLAGS.MANAGE_MESSAGES],
                botPerms: [Permissions.FLAGS.MANAGE_MESSAGES],
                requirements: {
                    args: true,
                    guildOnly: true,
                },
                usage: "[no of msg / subcommand]",
                subcommands: [
                    { name: "all", desc: "Delete 100 messages" },
                    {
                        name: "bots",
                        desc: "Delete all messages sent by a bot in this channel",
                    },
                    {
                        name: "*[string]",
                        desc: '`*Text` will delete any message containing "Text"',
                    },
                ],
                disabled: false,
                cooldown: 10,
                category: "Moderation",
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    async execute({ message, args, guildDB }, t) {
        //TODO: Add translation
        let messages;
        const errMsg = t("errors:generic");
        switch (args[0]) {
            case "all":
                args[0] = 99;
                break;
            case "bots":
                messages = await message.channel.messages
                    .fetch({ limit: 100 })
                    .then((msgs) => msgs.filter((m) => m.author.bot));
                break;
        }
        if (typeof args[0] === "string" && args[0].startsWith("*")) {
            args[0] = args[0].slice(1); //Remove * from it
            messages = await message.channel.messages
                .fetch({ limit: 100 })
                .then((msgs) =>
                    msgs.filter((m) => m.content.indexOf(args[0]) !== -1)
                );
        }
        if (!isNaN(parseInt(args[0]))) {
            const amount = parseInt(args[0]) + 1;
            if (isNaN(amount)) {
                return message.reply(
                    "The provided number of messages to delete doesn't seem to be a valid number."
                );
            } else if (amount < 1 || amount > 100) {
                return message.reply(
                    t("errors:invalidNumRange", {
                        min: 1,
                        max: 100,
                    })
                );
            }

            messages = await message.channel.messages
                .fetch({ limit: amount })
                .then((msgs) => {
                    if (!args[1] || args[1] !== "-f")
                        return msgs.filter((msg) => !msg.pinned);
                    return msgs;
                });
            message.channel.bulkDelete(messages, true).catch((err) => {
                message.client.logger.log(err, "error", ["PRUNING"]);
                return message.channel.send(errMsg);
            });
        } else if (messages) {
            message.delete();
            if (!args[1] || args[1] !== "-f")
                messages = messages.filter((msg) => !msg.pinned);
            message.channel.bulkDelete(messages, true).catch((err) => {
                message.client.logger.log(
                    "Error when PRUNING messages",
                    "error",
                    ["CMDS"]
                );
                console.log(err);
                return message.channel.send(errMsg);
            });
        } else {
            return message.channel.send(errMsg);
        }
        message.channel
            .send("Pruning done 👍. This message will be deleted in 5 seconds")
            .then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000);
            });
    }
};
