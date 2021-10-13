/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../../classes");
module.exports = {
    name: "guildMemberUpdate",
    once: false,
    async execute(client, oldMember, newMember) {
        if (client.debugLevel > 0)
            client.logger.log("guildMemberUpdate event", "debug");
        if (oldMember.equals(newMember) || newMember.user.bot) return;
        let guildDB;
        if (newMember.guild) {
            guildDB = await client.db.findOrCreateGuild(newMember.guild.id);
        } else {
            guildDB = { prefix: client.config.defaultPrefix, disabled: [] };
        }
        const t = client.i18next.getFixedT(guildDB.lang || "en-US");
        let diff = "";
        const addedRoles = [];
        const addedRoleIds = [];
        newMember.roles.cache.forEach((role) => {
            if (!oldMember.roles.cache.has(role.id)) {
                addedRoles.push(role.name);
                addedRoleIds.push(role.id);
            }
        });
        const removedRoles = [];
        oldMember.roles.cache.forEach((role) => {
            if (!newMember.roles.cache.has(role.id))
                removedRoles.push(role.name);
        });
        if (addedRoles.length > 0 || removedRoles.length > 0) {
            diff += `\n**${t("misc:roles")}**\n`;
            diff += "```diff";
            if (addedRoles.length > 0) {
                diff += `\n+ ${addedRoles.join("\n+ ")}`;
            }
            if (removedRoles.length > 0) {
                diff += `\n- ${removedRoles.join("\n- ")}`;
            }
        } else if (oldMember.nickname !== newMember.nickname) {
            diff += `\n**${t("misc:nickModify")}**\n`;
            diff += "```diff";
            diff += `\n- ${oldMember.nickname ?? oldMember.user.username}`;
            diff += `\n+ ${newMember.nickname ?? newMember.user.username}`;
        }
        diff += "\n```";
        diff = diff.trim();
        if (guildDB.plugins.serverlogs.enabled) {
            const channel = await newMember.guild.channels.fetch(
                guildDB.plugins.serverlogs.channel
            );
            if (channel) {
                const embed = new Embed({
                    tag: oldMember.user.tag,
                    avatarURL: oldMember.user.displayAvatarURL(),
                    footer: `ID: ${newMember.user.id}`,
                })
                    .setTitle(`${t("misc:mem_update")}`)
                    .setDesc(diff);
                channel
                    .send({
                        embeds: [embed],
                    })
                    .catch(() => {});
            }
        }
        if (
            newMember.guild.id === client.config.botGuildId &&
            (addedRoleIds.includes(client.config.roles.donator) ||
                addedRoleIds.includes(client.config.roles.booster))
        ) {
            const isDonator = !!addedRoleIds.includes(
                client.config.roles.donator
            );
            const info = await client.codes.create(
                isDonator ? 365 : 30,
                newMember.user
            ); //30 days premium code for boosters & 365 (1 year) for donators
            newMember.user.send({
                embeds: [
                    {
                        title: "You got a premium code!",
                        description: `Here's your code: ${info.code}`,
                        fields: [
                            {
                                name: "How to use my code?",
                                value: `Type \`${client.config.defaultPrefix}usecode ${info.code}\``,
                                inline: true,
                            },
                            {
                                name: "How to use my code publicly?",
                                value: `You can send \`${client.config.defaultPrefix}usecode ${info.code}\` in DMs to the bot to use the code publicly.\nIf you send it in a server, then that server will become premium server`,
                                inline: true,
                            },
                            {
                                name: "What's the difference between publicly used codes & premium server?",
                                value: "In a premium server, all members in that server can use my premium commands.\nIf you use it globally then you can use premium commands in any server!",
                                inline: true,
                            },
                            {
                                name: "When does this code expire?",
                                value: `It expires on ${new Date(
                                    info.expiresAt
                                )}`,
                                inline: true,
                            },
                            {
                                name: "I have more questions, where can I ask them?",
                                value: `Please ask them in the [support server](${client.config.supportGuildInvite})`,
                                inline: true,
                            },
                        ],
                    },
                ],
            });
        }
    },
};
