/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const backup = require("discord-backup");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "backup",
                aliases: ["bc"],
                memberPerms: ["MANAGE_GUILD"],
                botPerms: ["MANAGE_CHANNELS", "MANAGE_GUILD"],
                requirements: {
                    subcommand: true,
                    guildOnly: true,
                },
                disabled: true,
                subcommands: [
                    { name: "create", desc: "Create a backup" },
                    { name: "load", desc: "Load a backup" },
                    { name: "info", desc: "Info of a backup" },
                ],
                cooldown: 10,
                category: "Administration",
                slash: false,
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    async execute({ message, args, guildDB }, t) {
        const missingArgs = t("errors:missingArgs", {
            prefix: guildDB.prefix,
            cmd: this.name,
        });
        const embed = new Embed();
        args[0] = args[0].toLowerCase();
        if (!args[1] && args[0] !== "create") return message.reply(missingArgs);
        if (args[1]) const [, backupId] = args;
        else const backupId = "";

        switch (args[0]) {
            case "create":
                backup
                    .create(message.guild)
                    .then((backupData) => {
                        message.author.send(
                            t("cmds:backup.dm", {
                                id: `${backupData.id}`,
                                prefix: this.client.config.defaultPrefix,
                            })
                        );
                        return message.channel.send(t("cmds:backup.created"));
                    })
                    .catch(() => {
                        return message.channel.send(":x:");
                    });
                break;
            case "load":
                backup
                    .fetch(backupID)
                    .then(() => {
                        message.channel.send(t("cmds:backup.warning"));

                        const collector =
                            message.channel.createMessageCollector({
                                filter: (m) =>
                                    m.author.id === message.author.id &&
                                    ["confirm", "cancel"].includes(m.content),
                                time: 60000,
                                max: 1,
                            });
                        collector.on("collect", (m) => {
                            const confirm = m.content === "confirm";
                            collector.stop();
                            if (confirm) {
                                backup
                                    .load(backupID, message.guild)
                                    .then(() => {
                                        return message.author.send(
                                            t("cmds:backup.success")
                                        );
                                    })
                                    .catch((err) => {
                                        if (err === "No backup found")
                                            return message.channel.send(
                                                t("cmds:backup.invalidId")
                                            );
                                        else
                                            return message.author.send(
                                                t("errors:generic")
                                            );
                                    });
                            } else {
                                return message.channel.send(
                                    t("cmds:backup.cancelled")
                                );
                            }
                        });

                        collector.on("end", (collected, reason) => {
                            if (reason === "time")
                                return message.channel.send(t("misc:timeout"));
                        });
                    })
                    .catch(() => {
                        return message.channel.send(t("cmds:backup.invalidId"));
                    });
                break;
            case "info":
                backup
                    .fetch(backupId)
                    .then((backupData) => {
                        const date = new Date(backupData.data.createdTimestamp);
                        const yyyy = date.getFullYear().toString(),
                            mm = (date.getMonth() + 1).toString(),
                            dd = date.getDate().toString();
                        const formattedDate = `${yyyy}/${
                            mm[1] ? mm : "0" + mm[0]
                        }/${dd[1] ? dd : "0" + dd[0]}`;
                        embed
                            .setAuthor("ℹ️ Backup", backupData.data.iconURL)
                            .addField(t("misc:sname"), backupData.data.name)
                            .addField(t("misc:size"), `${backup.size} kb`)
                            .addField(t("misc:creat"), formattedDate)
                            .setFooter(backupData.id);
                        return message.channel.send({ embeds: [embed] });
                    })
                    .catch((err) => {
                        if (err === "No backup found")
                            return message.channel.send(
                                t("cmds:backup.invalidId")
                            );
                        else return message.channel.send(t("errors:generic"));
                    });
                break;
        }
    }

    //eslint-disable-next-line no-unused-vars
    async run({ interaction, guildDB, userDB }, t) {
        return;
    }
};
