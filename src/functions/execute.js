/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
require("../db/connection");
const { Collection, MessageEmbed } = require("discord.js");
const updateGuild = require("../db/functions/guild/updateGuild");
const getGuild = require("../db/functions/guild/getGuild");

module.exports = async (message, guildDB) => {
    let errMsg = `Are you trying to run a command?\nI think you have a typo in the command.\nWant help, send \`${guildDB.prefix}help\``;
    let embed = new MessageEmbed();
    embed.setColor("#ff0000");
    if (message.content.startsWith(guildDB.prefix) || message.content.startsWith(message.client.defaultPrefix)) {
        let args;
        if (message.content.startsWith(guildDB.prefix)) {
        args = message.content
            .slice(guildDB.prefix.length)
            .trim()
            .split(/ +/);
        } else {
        args = message.content
            .slice(message.client.defaultPrefix.length)
            .trim()
            .split(/ +/);
        }
        const commandName = args.shift().toLowerCase();
        const command =
            message.client.commands.get(commandName) ||
            message.client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );

        if (
            message.client.disabled &&
            (message.client.disabled.get(commandName) ||
                message.client.disabled.find(
                    (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
                ))
        ) {
            return message.channel.send(
                `That command was disabled, ${message.author}`
            );
        }

        if (!command || typeof command === "undefined") {
            //message.reply(errMsg);
            return;
        }

        if (command.guildOnly && message.channel.type === "dm") {
            return message.reply(
                `I can't execute that command inside DMs, ${message.author}`
            );
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
                    `You didn't give the bot permission to do this!\nSend \`${guildDB.prefix}help ${command.name}\` to get list of permissions required by this command.`
                );
            }
        }

        if (command.args && !args.length) {
            let reply = `Arguments are required for this command.`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${guildDB.prefix}${command.name} ${command.usage}\``;
            }

            embed.setTitle("No args provided");
            embed.addField(
                `You didn't provide any arguments, ${message.author.tag}!`,
                reply
            );
            embed.addField(
                "Want help?",
                `Send \`${guildDB.prefix}help ${command.name}\``
            );
            return message.reply({ embeds: [embed] });
        }

        if (command.subcommand && !args.length) {
            let reply = `Subcommands are required for this command.`;

            if (command.subcommands) {
                reply += `\nThe subcommand(s) available are: \`${command.subcommands.join(
                    ", "
                )}\``;
            }

            embed.setTitle("No subcommands provided");
            embed.addField(
                `You didn't provide any subcommand, ${message.author.tag}!`,
                reply
            );
            embed.addField(
                "Want help?",
                `Send \`${guildDB.prefix}help ${command.name}\``
            );
            return message.reply({ embeds: [embed] });
        }

        const { cooldowns } = message.client;

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
                command.execute(message, args, guildDB);
                message.channel.stopTyping(true);
            } catch (err) {
                console.error(err);
                embed
                    .setTitle("An error occurred!")
                    .embed.addField(
                        "\u200b",
                        "There was an error trying to execute that command."
                    );
                embed.addField(
                    "Please report this at https://github.com/Welcome-Bot/welcome-bot/issues",
                    "\u200b"
                );
                message.reply({ embeds: [embed] });
                return;
            }
        }
    } else if (message.content.startsWith(guildDB.prefix.trim())) {
        //message.reply(errMsg);
    }
};
