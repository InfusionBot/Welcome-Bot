/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
require("../db/connection");
const { Collection } = require("discord.js");
const updateGuild = require("../db/functions/updateGuild");
const getGuild = require("../db/functions/getGuild");

module.exports = async (message, client, guildDB) => {
    let errMsg = `Are you trying to run a command?\nI think you have a typo in the command.\nWant help, send \`${guildDB.prefix}help\``;
    if (message.content.startsWith(guildDB.prefix)) {
        const args = message.content
            .slice(guildDB.prefix.length)
            .trim()
            .split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command =
            client.commands.get(commandName) ||
            client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );

        if (!command || typeof command === "undefined") {
            //message.reply(errMsg);
            return;
        }

        if (command.guildOnly && message.channel.type === "dm") {
            return message.reply("I can't execute that command inside DMs!");
        }

        if (
            command.ownerOnly &&
            !process.env.ownerIDs.includes(message.author.id)
        ) {
            return message.reply(
                "This command can only be executed by bot owners"
            );
        }

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.reply("You don't have permission to do this!");
            }
        }

        if (command.bot_perms && message.channel.type !== "dm") {
            const botPerms = message.guild.me.permissionsIn(message.channel);
            if (!botPerms || !botPerms.has(command.bot_perms)) {
                return message.reply(
                    "You didn't give the bot permission to do this!"
                );
            }
        }

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${guildDB.prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        if (command.subcommand && !args.length) {
            let reply = `You didn't provide subcommand(s), ${message.author}!`;

            if (command.subcommands) {
                reply += `\nThe subcommand(s) available are: \`${command.subcommands.join(
                    ", "
                )}\``;
            }

            return message.channel.send(reply);
        }

        const { cooldowns } = client;

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime =
                timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(
                    `Please wait ${timeLeft.toFixed(
                        1
                    )} more second(s) before reusing the \`${
                        command.name
                    }\` command.`
                );
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        if (command.catchError) {
            try {
                message.channel.startTyping();
                command.execute(message, args);
                }
                message.channel.stopTyping();
            } catch (error) {
                console.error(error);
                message.reply(
                    "There was an error trying to execute that command, please report this at https://github.com/Welcome-Bot/welcome-bot/issues"
                );
                return;
            }
        }
    } else if (message.content.startsWith(guildDB.prefix.trim())) {
        //message.reply(errMsg);
    }
};
