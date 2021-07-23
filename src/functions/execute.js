/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
require("../db/connection");
const { MessageEmbed, Permissions } = require("discord.js");
const beautifyPerms = require("../functions/beautifyPerms");
const getUser = require("../db/functions/user/getUser");

module.exports = async (message, guildDB) => {
    const client = message.client;
    const userDB = await getUser(message.author.id);
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixes = [
        escapeRegex(client.defaultPrefix.toLowerCase()),
        escapeRegex(guildDB.prefix.toLowerCase()),
    ];
    const prefixRegex = new RegExp(
        `^(<@!?${client.user.id}> |${prefixes.join("|")})\\s*`
    );
    let prefix;
    try {
        [, prefix] = message.content.toLowerCase().match(prefixRegex);
    } catch (e) {}
    const t = client.i18next.getFixedT(guildDB.lang || "en-US");
    if (!message.client.application?.owner)
        await message.client.application?.fetch();
    let embed = new MessageEmbed().setColor("#ff0000");
    if (prefix) {
        //let errMsg = `Are you trying to run a command?\nI think you have a typo in the command.\nWant help, send \`${guildDB.prefix}help\``;
        let args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command =
            message.client.commands.enabled.get(commandName) ||
            message.client.commands.enabled.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );

        /*if (
            message.client.disabled &&
            (message.client.disabled.get(commandName) ||
                message.client.disabled.find(
                    (cmd) => cmd.aliases.length && cmd.aliases.includes(commandName)
                ))
        ) {
            return message.channel.send(
                `That command was disabled, ${message.author}`
            );
        }*/

        if (!command || typeof command === "undefined") {
            if (client.debug && client.debugLevel > 0)
                client.logger.log(`Can't find command: ${commandName}`);
            //message.reply(errMsg);
            return;
        }

        if (guildDB.disabled.includes(command.name)) return;

        if (
            message.guild &&
            !message.guild.me
                .permissionsIn(message.channel)
                .has(Permissions.FLAGS.SEND_MESSAGES)
        ) {
            //return message.author.send(t("errors:noSendMsgPerm"));
            return;
        }

        if (
            command.requirements?.ownerOnly &&
            !(
                message.client.ownerIDs.includes(message.author.id) ||
                message.author.id === client.application?.owner.id
            )
        ) {
            return message.reply(t("errors:developerOnly"));
        }

        if (command.requirements?.guildOnly && message.channel.type === "DM") {
            return message.reply(
                `I can't execute that command inside DMs, ${message.author}`
            );
        }

        if (
            command?.memberPerms &&
            message.channel.type !== "DM" &&
            message.guild
        ) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms) {
                return message.reply(t("errors:youDontHavePermShort"));
            }
            for (var i = 0; i < command.memberPerms.length; i++) {
                if (!authorPerms.has(command.memberPerms[i])) {
                    return message.reply(
                        t("errors:youDontHavePermission", {
                            permission: t(
                                `permissions:${new Permissions(
                                    command.memberPerms[i]
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

        if (command.requirements?.args && !args.length) {
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

        if (command.requirements?.subcommand && !args.length) {
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

        if (client.debug && client.debugLevel >= 3)
            client.logger.log(
                `Starting to prerun cmd: ${command.name}`,
                "debug"
            );
        let prerunResult = false;
        try {
            prerunResult = await command.prerun(message, guildDB, t);
        } catch (e) {
            client.logger.log("Error when prerunning cmd", "error", ["CMDS"]);
            console.error(e);
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
        if (prerunResult) {
            if (client.debug && client.debugLevel >= 2)
                client.logger.log(
                    `Starting to execute cmd: ${command.name}`,
                    "debug"
                );
            message.channel.sendTyping();
            try {
                command.execute({ message, args, guildDB, userDB }, t);
            } catch (err) {
                client.logger.log("Error when executing cmds", "error", [
                    "CMDS",
                ]);
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
            if (client.debug && client.debugLevel >= 2)
                client.logger.log(
                    `Finished executing cmd: ${command.name}`,
                    "debug"
                );
        }
        if (client.debug && client.debugLevel >= 3)
            client.logger.log(
                `Finished prerunning cmd: ${command.name}`,
                "debug"
            );
    } else if (client.debug && client.debugLevel >= 1) {
        client.logger.log("prefix did not match", "debug");
        console.log("PREFIX match:", message.content.match(prefixRegex));
    }
};
