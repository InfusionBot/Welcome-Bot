/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
require("../db/connection");
const { MessageEmbed, Permissions } = require("discord.js");

module.exports = async (message, guildDB) => {
    const { client } = message;
    const userDB = await client.db.findOrCreateUser(message.author.id);
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixes = [
        escapeRegex(client.config.defaultPrefix.toLowerCase()),
        escapeRegex(guildDB.prefix.toLowerCase()),
    ];
    const prefixRegex = new RegExp(
        `^(<@!?${client.user.id}> |${prefixes.join("|")})\\s*`
    );
    let prefix = null;
    try {
        [, prefix] = message.content.toLowerCase().match(prefixRegex);
    } catch (e) {} //eslint-disable-line no-empty
    const t = client.i18next.getFixedT(guildDB.lang || "en-US");
    if (!client.application?.owner) await client.application?.fetch();
    const embed = new MessageEmbed().setColor("#ff0000");
    if (prefix) {
        //let errMsg = `Are you trying to run a command?\nI think you have a typo in the command.\nWant help, send \`${guildDB.prefix}help\``;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command =
            client.commands.enabled.get(commandName) ||
            client.commands.enabled.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );

        /*if (
            client.commands.disabled &&
            (client.commands.disabled.get(commandName) ||
                client.commands.disabled.find(
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

        if (guildDB.disabled.includes(command.name)) return; //ignore disabled commands

        command.usage = command.getUsage(t); //Don't use defaultUsage if there's an language translation for the command's usage

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
                client.config.ownerIds.includes(message.author.id) ||
                client.config.staffIds.includes(message.author.id) ||
                message.author.id === client.application?.owner.id
            )
        ) {
            return message.reply(t("errors:developerOnly"));
        }

        if (
            command.requirements?.premiumOnly &&
            !(
                client.codes.valid.includes(guildDB.premium?.code) ||
                client.codes.valid.includes(userDB.premium?.code)
            )
        ) {
            return message.channel.send(t("errors:premiumOnly"));
        }

        if (command.requirements?.guildOnly && message.channel.type === "DM") {
            return message.reply(
                `I can't execute that command inside DMs, ${message.author}`
            );
        }

        if (
            command?.botPerms &&
            message.channel.type !== "DM" &&
            message.guild
        ) {
            const botPerms = message.guild.me.permissionsIn(message.channel);
            if (!botPerms) {
                return message.reply(t("errors:iDontHavePermShort"));
            }
            for (var i = 0; i < command.botPerms.length; i++) {
                if (!botPerms.has(command.botPerms[i])) {
                    return message.reply(
                        t("errors:iDontHavePermission", {
                            permission: t(
                                `permissions:${new Permissions(
                                    command.botPerms[i]
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

        if (
            command?.memberPerms &&
            message.channel.type !== "DM" &&
            message.guild
        ) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms) {
                message.reply(t("errors:youDontHavePermShort"));
                if (!client.config.ownerIds.includes(message.author.id)) return;
            }
            for (let i = 0; i < command.memberPerms.length; i++) {
                if (!authorPerms.has(command.memberPerms[i])) {
                    message.reply(
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
                    if (!client.config.ownerIds.includes(message.author.id))
                        return;
                }
            }
        }

        if (command.requirements?.args && !args.length) {
            let reply = t("errors:missingArgs", {
                prefix: guildDB.prefix,
                cmd: command.name,
            });

            if (command.usage) {
                reply += `\nUsage: \`${guildDB.prefix}${command.name} ${command.usage}\``;
            }

            embed.addField(
                `You didn't provide any arguments, ${message.author.tag}!`,
                reply
            );
            return message.reply({ embeds: [embed] });
        }

        if (command.requirements?.subcommand && !args.length) {
            let reply = `Subcommands are required for this command.`;

            if (command.subcommands) {
                const subcmds = [];
                for (let i = 0; i < command.subcommands.length; i++) {
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

        if (command.subcommands && command.requirements?.subcommand) {
            const subcmds = [];
            for (let i = 0; i < command.subcommands.length; i++) {
                subcmds.push(command.subcommands[i].name);
            }
            if (!subcmds.includes(args[0]))
                return message.reply(
                    t("errors:invalidSubCmd", {
                        prefix: guildDB.prefix,
                        cmd: command.name,
                    })
                );
        }

        if (client.debug && client.debugLevel >= 3)
            client.logger.log(
                `Starting to prerun cmd: ${command.name}`,
                "debug"
            );
        let prerunResult = false;
        try {
            prerunResult = command.prerun(message, guildDB, t);
        } catch (e) {
            client.logger.log("Error when prerunning cmd", "error", ["CMDS"]);
            console.error(e);
            embed
                .setTitle(t("errors:generic"))
                .addField(
                    `Please report this to ${client.ownersTags.join(" OR ")}`,
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
            message.channel.sendTyping().catch(() => {});
            try {
                command.execute({ prefix, message, args, guildDB, userDB }, t);
            } catch (err) {
                client.logger.log("Error when executing cmds", "error", [
                    "CMDS",
                ]);
                console.error(err);
                embed
                    .setTitle(t("errors:generic"))
                    .addField(
                        `Please report this to ${client.ownersTags.join(
                            " OR "
                        )}`,
                        "\u200b"
                    );
                if (
                    client.config.ownerIds.includes(message.author.id) ||
                    client.config.staffIds.includes(message.author.id) ||
                    message.author.id === client.application?.owner.id
                )
                    embed.addField("Error", `${err}`);
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
