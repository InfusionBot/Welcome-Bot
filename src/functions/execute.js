/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
require("../db/connection");
const { Collection, MessageEmbed, Permissions } = require("discord.js");
const updateGuild = require("../db/functions/guild/updateGuild");
const getGuild = require("../db/functions/guild/getGuild");
const beautifyPerms = require("../functions/beautifyPerms");

module.exports = async (message, guildDB) => {
    const client = message.client;
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixes = [
        escapeRegex(client.defaultPrefix),
        escapeRegex(guildDB.prefix),
    ];
    const prefixRegex = new RegExp(
        `^(<@!?${client.user.id}> |${prefixes.join("|")})\\s*`
    );
    let prefix;
    try {
        [, prefix] = message.content.match(prefixRegex);
    } catch(e) {}
    const t = client.i18next.getFixedT(guildDB.lang || "en-US");
    if (!message.client.application?.owner)
        await message.client.application?.fetch();
    let embed = new MessageEmbed();
    embed.setColor("#ff0000");
    if (prefix) {
        //let errMsg = `Are you trying to run a command?\nI think you have a typo in the command.\nWant help, send \`${guildDB.prefix}help\``;
        let args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command =
            message.client.commands.enabled.get(commandName) ||
            message.client.commands.enabled.find(
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
            if (client.debug)
                client.logger.log(`Can't find command: ${commandName}`);
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
            !(
                message.client.ownerIDs.includes(message.author.id) ||
                message.author.id === client.application?.owner.id
            )
        ) {
            return message.reply(t("errors:developerOnly"));
        }

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms) {
                return message.reply(t("errors:youDontHavePermShort"));
            }
            for (var i = 0; i < command.permissions.length; i++) {
                if (!authorPerms.has(command.permissions[i])) {
                    return message.reply(
                        t("errors:youDontHavePermission", {
                            permission: t(
                                `permissions:${new Permissions(
                                    command.permissions[i]
                                )
                                    .toArray()
                                    .join("")
                                    .toUpperCase()}`
                            ),
                        })
                    );
                }
            }
        }

        if (command.bot_perms && message.channel.type !== "dm") {
            const botPerms = message.guild.me.permissionsIn(message.channel);

            if (!botPerms || !botPerms.has(command.bot_perms)) {
                return message.reply(
                    `You didn't give the bot permission(s) to do this!\nSend \`${guildDB.prefix}help ${command.name}\` to get list of permissions required by this command.\nDon't know what you have given already? Send \`${guildDB.prefix}botperms\` in this channel itself.`
                );
            }
        }

        if (command.args && !args.length) {
            let reply = t("errors:missingArgs");

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
                let subcmds = [];
                for (var i = 0; i < command.subcommands.length; i++) {
                    subcmds.push(command.subcommands[i].name);
                }
                reply += `\nThe subcommand(s) available are: \`${subcmds.join(
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

        const { cooldowns } = message.client.commands;

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
                    t(`errors:cooldown`, {
                        seconds: timeLeft.toFixed(1),
                        command: command.name,
                    })
                );
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        if (client.debug)
            client.logger.log(
                `Starting to execute cmd: ${command.name}`,
                "debug"
            );
        message.channel.startTyping();
        if (command.catchError) {
            try {
                message.channel.startTyping();
                command.execute(message, args, guildDB, t);
                message.channel.stopTyping(true);
            } catch (err) {
                console.error(err);
                embed
                    .setTitle(t("errors:generic"))
                    .addField(
                        `Please report this to ${message.client.ownersTags.join(
                            " OR "
                        )}`,
                        "\u200b"
                    );
                message.reply({ embeds: [embed] });
                return;
            }
        } else {
            command.execute(message, args, guildDB, t);
        }
        message.channel.stopTyping(true);
        if (client.debug)
            client.logger.log(
                `Finished executing cmd: ${command.name}`,
                "debug"
            );
    } else if (client.debug) {
        client.logger.log("prefix did not match", "debug");
        console.log("PREFIX match:", message.content.match(prefixRegex));
    }
};
