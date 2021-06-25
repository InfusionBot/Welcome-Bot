/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
module.exports = {
    name: "prune",
    description: "Prune messages.",
    aliases: ["purge"],
    permissions: [Permissions.FLAGS.MANAGE_GUILD],
    bot_perms: [Permissions.FLAGS.MANAGE_MESSAGES],
    args: true,
    guildOnly: true,
    usage: "[no of msg to prune / subcommand]",
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
    cooldown: 5,
    category: "Moderation",
    execute(message, args, guildDB) {
        let messages;
        let errMsg =
            "An error occurred when trying to prune messages in this channel";
        switch (args[0]) {
            case "all":
                args[0] = 99;
                break;
            case "bots":
                messages = message.channel.messages.cache.filter(
                    (m) => m.author.bot === true
                );
                break;
        }
        if (typeof args[0] === "string" && args[0].startsWith("*")) {
            args[0] = args[0].slice(1); //Remove * from it
            messages = message.channel.messages.cache.filter(
                (m) => m.content.indexOf(args[0]) !== -1
            );
        }
        message.delete();
        if (!isNaN(parseInt(args[0]))) {
            const amount = parseInt(args[0]);
            if (isNaN(amount)) {
                return message.reply(
                    "The provided number of messages to delete doesn't seem to be a valid number."
                );
            } else if (amount <= 0 || amount >= 100) {
                return message.reply(
                    "Please input a number between 0 and 100 only."
                );
            }

            message.channel.bulkDelete(amount, true).catch((err) => {
                console.error(err);
                message.channel.send(errMsg);
            });
        } else {
            if (messages) {
                message.channel.bulkDelete(messages, true).catch((err) => {
                    console.error(err);
                    message.channel.send(errMsg);
                });
            } else {
                return message.channel.send(errMsg);
            }
        }
        message.channel
            .send("Pruning done 👍. This message will be deleted in 5 seconds")
            .then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000);
            });
    },
};
