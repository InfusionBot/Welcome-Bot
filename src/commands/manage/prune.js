/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "prune",
    description: "Prune messages.",
    permissions: ["MANAGE_GUILD"],
    bot_perms: ["MANAGE_MESSAGES"],
    args: true,
    guildOnly: true,
    usage: "[no of msg to prune / subcommand]",
    subcommands: ["all", "bots", "*"],
    subs_desc: ["Delete 100 messages", "Delete all messages sent by a bot", "`*Text` will delete any message containing \"Text\""],
    cooldown: 10,
    category: "Manage",
    execute(message, args, guildDB) {
        let messages;
        let errMsg = "An error occurred when trying to prune messages in this channel";
        switch (args[0]) {
            case "all":
                args[0] = 99;
                break;
            case "bots":
                messages = message.channel.messages.cache.filter(m => m.author.bot);
                break;
        }
        if (args[0].startsWith("*")) {
            args[0] = args[0].slice(1); //Remove * from it
            messages = message.channel.messages.cache.filter(m => m.content.indexOf(args[0]) !== -1);
        }
        if (typeof args[0] === "number") {
            const amount = parseInt(args[0]) + 1;
            if (isNaN(amount)) {
                return message.reply("The provided number of messages to delete doesn't seem to be a valid number.");
            } else if (amount <= 1 || amount > 100) {
                return message.reply("Please input a number between 1 and 99 only.");
            }

            message.channel.bulkDelete(amount, true).catch(err => {
                console.error(err);
                message.channel.send(errMsg);
            });
        } else {
            if (messages)
                return message.channel.bulkDelete(messages, true).catch(err => {
                    console.error(err);
                    message.channel.send(errMsg);
                });
            message.channel.send(errMsg);
        }
        message.react("👍");
    },
};
