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
        escapeRegex(client.user.username.toLowerCase()),
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
            message.channel.send(
                `That command was disabled, ${message.author}`
            );
            return false;
        }*/

        if (!command || typeof command === "undefined") {
            if (client.debug && client.debugLevel > 0)
                client.logger.log(`Can't find command: ${commandName}`);
            //message.reply(errMsg);
            return false;
        }

        if (guildDB.disabled.includes(command.name)) return false; //ignore disabled commands

        command.usage = command.getUsage(t); //Don't use defaultUsage if there's an language translation for the command's usage

        if (
            message.guild &&
            !message.guild.me
                .permissionsIn(message.channel)
                .has(Permissions.FLAGS.SEND_MESSAGES)
        ) {
            //message.author.send(t("errors:noSendMsgPerm"));
            return false;
        }

        if (
            command.requirements?.ownerOnly &&
            !(
                client.config.ownerIds.includes(message.author.id) ||
                client.config.staffIds.includes(message.author.id) ||
                message.author.id === client.application?.owner.id
            )
        ) {
            message.channel.send(t("errors:developerOnly"));
            return false;
        }

        if (
            command.requirements?.premiumOnly &&
            !(
                client.codes.getCode(guildDB?.premium?.code) ||
                client.codes.getCode(userDB?.premium?.code)
            )
        ) {
            message.channel.send(t("errors:premiumOnly"));
            return false;
        }

        if (command.requirements?.guildOnly && message.channel.type === "DM") {
            message.reply(
                `I can't execute that command inside DMs, ${message.author}`
            );
            return false;
        }

        if (
            command?.botPerms &&
            message.channel.type !== "DM" &&
            message.guild
        ) {
            const botPerms = message.guild.me.permissionsIn(message.channel);
            if (!botPerms) {
                message.channel.send(t("errors:iDontHavePermShort"));
                return false;
            }
            for (var i = 0; i < command.botPerms.length; i++) {
                if (!botPerms.has(command.botPerms[i])) {
                    const text = t("errors:iDontHavePermission", {
                        permission: t(
                            `permissions:${new Permissions(command.botPerms[i])
                                .toArray()
                                .join("")
                                .toUpperCase()}`
                        ),
                    });
                    message.reply(text).catch(() => {
                        message.channel.send(text);
                    });
                    return false;
                }
            }
        }
        let msg;
        if (
            command?.memberPerms &&
            message.channel.type !== "DM" &&
            message.guild
        ) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms) {
                msg = await message.channel.send(
                    t("errors:youDontHavePermShort")
                );
                client.wait(5000).then(() => {
                    msg.delete();
                });
                if (!client.config.ownerIds.includes(message.author.id)) {
                    return false;
                }
            }
            for (let i = 0; i < command.memberPerms.length; i++) {
                if (!authorPerms.has(command.memberPerms[i])) {
                    // eslint-disable-next-line no-await-in-loop
                    const msg = await message.channel.send(
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
                    client.wait(5000).then(() => {
                        msg.delete();
                    });
                    if (!client.config.ownerIds.includes(message.author.id)) {
                        return false;
                    }
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
            message.reply({ embeds: [embed] }).catch(() => {
                message.channel.send({ embeds: [embed] });
            });
            return false;
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
            message.reply({ embeds: [embed] }).catch(() => {
                message.channel.send({ embeds: [embed] });
            });
            return false;
        }

        if (command.subcommands && command.requirements?.subcommand) {
            const subcmds = [];
            for (let i = 0; i < command.subcommands.length; i++) {
                subcmds.push(command.subcommands[i].name);
            }
            if (!subcmds.includes(args[0])) {
                message.channel.send(
                    t("errors:invalidSubCmd", {
                        prefix: guildDB.prefix,
                        cmd: command.name,
                    })
                );
                return false;
            }
        }
        let member;
        try {
            member = await client.guilds.cache
                .get(client.config.servers.main)
                .members.fetch(message.author.id);
        } catch (e) {
            member = null;
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
            console.log(e);
            embed
                .setTitle(t("errors:generic"))
                .addField(
                    `Please report this to ${client.ownersTags.join(" OR ")}`,
                    "\u200b"
                );
            message.reply({ embeds: [embed] }).catch(() => {
                message.channel.send({ embeds: [embed] });
            });
            return false;
        }
        if (prerunResult) {
            if (client.debug && client.debugLevel >= 2)
                client.logger.log(
                    `Starting to execute cmd: ${command.name}`,
                    "debug"
                );
            //message.channel.sendTyping().catch(() => {});
            try {
                const donatorRoles = [
                    ...Object.values(client.config.roles.donators),
                    client.config.roles.donator,
                ];
                command.execute(
                    {
                        prefix,
                        message,
                        args,
                        guildDB,
                        userDB,
                        language: client.languages.find(
                            (l) =>
                                l.name === guildDB.lang ||
                                l.aliases.includes(guildDB.lang)
                        ),
                        donator:
                            member &&
                            member.roles.cache.some((role) =>
                                donatorRoles.includes(role)
                            ),
                    },
                    t
                );
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
                return false;
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
        return true;
    } else if (client.debug && client.debugLevel > 1) {
        client.logger.log("prefix did not match", "debug");
        console.log("PREFIX match:", message.content.match(prefixRegex));
    }
    return false;
};
