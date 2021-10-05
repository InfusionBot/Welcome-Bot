/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { Permissions } = require("discord.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "autorole",
                aliases: ["ar"],
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [],
                requirements: {
                    subcommand: false,
                    guildOnly: true,
                },
                disabled: false,
                subcommands: [
                    { name: "disable", desc: "Disable autorole" },
                    { name: "enable", desc: "Enable autorole" },
                    { name: "set [role id]", desc: "Set autorole" },
                ],
                cooldown: 5,
                category: "Administration",
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
        if (args[0]) args[0] = args[0].toLowerCase();

        let role, roleId;
        switch (args[0]) {
            case "set":
                if (!args[1]) return message.reply(missingArgs);
                roleId = args[1];
                role = message.guild.roles.cache.find((r) => r.id === roleId);
                if (!role) return message.reply(t("cmds:autorole.invalidRole"));
                if (role.position >= message.guild.me.roles.highest.position)
                    return message.channel.send(t("misc:higherRoleBot"));
                guildDB.plugins.autorole.role = role.id;
                guildDB.markModified("plugins.autorole.role");
                await guildDB.save();
                message.reply(
                    t("cmds:autorole.success", { role: `${role.name}` })
                );
                break;
            case "disable":
                guildDB.plugins.autorole.enabled = false;
                guildDB.markModified("plugins.autorole.enabled");
                await guildDB.save();
                message.reply(t("cmds:autorole.disabled"));
                break;
            case "enable":
                guildDB.plugins.autorole.enabled = true;
                guildDB.markModified("plugins.autorole.enabled");
                await guildDB.save();
                message.reply(t("cmds:autorole.enabled"));
                break;
            default:
                if (!args.length) {
                    role =
                        message.guild.roles.cache.get(
                            `${guildDB.plugins.autorole.role}`
                        ) ?? t("misc:not_set");
                    embed
                        .setTitle(t("cmds:autorole.current.title"))
                        .setDesc(
                            t("cmds:autorole.current.desc", {
                                prefix: guildDB.prefix,
                            })
                        )
                        .addField(t("misc:role"), `${role.name ?? role}`);
                    message.channel.send({ embeds: [embed] });
                } else {
                    return message.reply(
                        t("errors:invalidSubcmd", {
                            prefix: guildDB.prefix,
                            cmd: this.name,
                        })
                    );
                }
                this.removeCooldown(message.author);
                break;
        }
        await guildDB.save();
    }
};
