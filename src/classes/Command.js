/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const createOptionHandler = require("../functions/createOptionHandler");
const { userFromMention } = require("../helpers/Util.js");
const { Permissions, Collection } = require("discord.js");
module.exports = class Command {
    constructor(opts, client) {
        this.client = client;
        const options = createOptionHandler("Command", opts);
        this.name = options.required("name");
        this.aliases = options.optional("aliases", null);
        this.memberPerms = options.optional("memberPerms", null);
        this.botPerms = options.optional("botPerms", null);
        this.requirements = options.optional("requirements", {
            args: false,
            subcommand: false,
            guildOnly: false,
            ownerOnly: false,
            premiumOnly: false,
        });
        //this.usage = options.optional("usage", null);
        this.defaultUsage = client.i18next
            ? client.i18next.getFixedT("en-US")(`cmds:${this.name}.usage`)
            : "";
        if (this.defaultUsage === `${this.name}.usage`) this.defaultUsage = "";
        this.disabled = options.optional("disabled", false);
        this.subcommands = options.optional("subcommands", null);
        this.cooldown = options.optional("cooldown", 3);
        this.category = options.optional("category", "General");
        this.slash = options.optional("slash", false);
        this.options = options.optional("options", null);
        if (this.subcommands) {
            for (var i = 0; i < this.subcommands.length; i++) {
                if (this.subcommands[i].name && !this.subcommands[i].desc) {
                    throw new TypeError(
                        "If subcommands are provided then their description should also be provided\nDescription not provided for " +
                            this.subcommands[i].name
                    );
                    // eslint-disable-next-line no-unreachable
                    process.exit();
                }
            }
        }
        if (this.name.includes("-")) {
            this.aliases.push(this.name.replace(/-/g, ""));
        }
        if (this.aliases) {
            for (let i = 0; i < this.aliases.length; i++) {
                const alias = this.aliases[i];
                if (alias.includes("-")) {
                    const alias2 = alias.replace(/-/g, "");
                    if (this.name !== alias2) this.aliases.push(alias2);
                }
            }
        }
    }

    async preCheck(interaction, guildDB, t) {
        if (guildDB.disabled.includes(this.name)) return false; //ignore disabled commands
        //const usage = this.getUsage(t);
        if (
            this.requirements?.ownerOnly &&
            !(
                this.client.config.ownerIDs.includes(interaction.user.id) ||
                this.client.config.staffIds.includes(interaction.user.id) ||
                interaction.user.id === this.client.application?.owner.id
            )
        ) {
            return interaction.editReply(t("errors:developerOnly"));
        }
        if (this.requirements?.guildOnly && !interaction.inGuild())
            return false; // silently fail if command is for guilds only
        let userDB = await this.client.userDbFuncs.getUser(interaction.user.id);
        if (!userDB) {
            await this.client.userDbFuncs.addUser(interaction.user.id);
            userDB = await this.client.userDbFuncs.getUser(interaction.user.id);
        }
        const basicPerms = [
            Permissions.FLAGS.VIEW_CHANNEL,
            Permissions.FLAGS.SEND_MESSAGES,
            Permissions.FLAGS.READ_MESSAGE_HISTORY,
            Permissions.FLAGS.EMBED_LINKS,
        ];
        //Checking perms
        if (interaction.inGuild()) {
            const botPerms = interaction.guild.me.permissionsIn(
                interaction.channel
            );
            if (!botPerms) return false;
            for (let i = 0; i < basicPerms.length; i++) {
                if (!botPerms.has(basicPerms[i])) {
                    interaction.editReply(
                        t("errors:iDontHavePermission", {
                            permission: this.getPermTranslation(
                                basicPerms[i],
                                t
                            ),
                        })
                    );
                    return false;
                }
            }
            if (this?.botPerms?.length) {
                for (let i = 0; i < this.botPerms.length; i++) {
                    if (!botPerms.has(this.botPerms[i])) {
                        interaction.editReply(
                            t("errors:iDontHavePermission", {
                                permission: this.getPermTranslation(
                                    this.botPerms[i],
                                    t
                                ),
                            })
                        );
                        return false;
                    }
                }
            }
        }
        if (this?.memberPerms?.length && interaction.inGuild()) {
            const authorPerms = interaction.channel.permissionsFor(
                interaction.user
            );
            if (!authorPerms) return false;
            for (let i = 0; i < this.memberPerms.length; i++) {
                if (!authorPerms.has(this.memberPerms[i])) {
                    interaction.editReply(
                        t("errors:youDontHavePermission", {
                            permission: this.getPermTranslation(
                                this.memberPerms[i],
                                t
                            ),
                        })
                    );
                    return false;
                }
            }
        }
        const { cooldowns } = this.client.commands;

        if (!cooldowns.has(this.name)) {
            cooldowns.set(this.name, new Collection());
        }

        const now = Date.now(); //number of milliseconds elapsed since January 1, 1970 00:00:00 UTC. Example: 1625731103509
        const timestamps = cooldowns.get(this.name);
        const cooldownAmount = (this.cooldown || 3) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime =
                timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                //Still this cooldown didn't expire.
                const timeLeft = (expirationTime - now) / 1000;
                interaction.editReply(
                    t(`errors:cooldown`, {
                        seconds: timeLeft.toFixed(),
                        command: this.name,
                    })
                );
                return false;
            }
        }

        this.applyCooldown(interaction.user, cooldownAmount);
        return true;
    }

    prerun(message, guildDB, t) {
        const basicPerms = [
            Permissions.FLAGS.VIEW_CHANNEL,
            Permissions.FLAGS.SEND_MESSAGES,
            Permissions.FLAGS.READ_MESSAGE_HISTORY,
            Permissions.FLAGS.EMBED_LINKS,
        ];
        //Checking basic perms
        if (message.channel.type !== "DM" && message.guild) {
            const botPerms = message.guild.me.permissionsIn(message.channel);

            if (!botPerms) {
                message.reply(
                    `${t("errors:iDontHavePermShort")}\nType \`${
                        guildDB.prefix
                    }help ${
                        this.name
                    }\` to get list of permissions required by this command.\nDon't know what you have given already? Type \`${
                        guildDB.prefix
                    }botperms\` in this channel itself.`
                );
                return false;
            }
            for (let i = 0; i < basicPerms.length; i++) {
                if (!botPerms.has(basicPerms[i])) {
                    message.reply(
                        t("errors:iDontHavePermission", {
                            permission: this.getPermTranslation(
                                basicPerms[i],
                                t
                            ),
                        })
                    );
                    return false;
                }
            }
        }
        const { cooldowns } = this.client.commands;

        if (!cooldowns.has(this.name)) {
            cooldowns.set(this.name, new Collection());
        }

        const now = Date.now(); //number of milliseconds elapsed since January 1, 1970 00:00:00 UTC. Example: 1625731103509
        const timestamps = cooldowns.get(this.name);
        const cooldownAmount = (this.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime =
                timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                //Still this cooldown didn't expire.
                const timeLeft = (expirationTime - now) / 1000;
                message.reply(
                    t(`errors:cooldown`, {
                        seconds: timeLeft.toFixed(),
                        command: this.name,
                    })
                );
                return false;
            }
        }

        this.applyCooldown(message.author, cooldownAmount);
        return true;
    }

    applyCooldown(author, cooldownAmount) {
        const timestamps = this.client.commands.cooldowns.get(this.name);
        timestamps.set(author.id, Date.now());
        setTimeout(() => timestamps.delete(author.id), cooldownAmount); //Delete cooldown for author after cooldownAmount is over.
        return true;
    }

    removeCooldown(author) {
        const timestamps = this.client.commands.cooldowns.get(this.name);
        timestamps.delete(author.id);
        return true;
    }

    //eslint-disable-next-line no-unused-vars
    run({ interaction, guildDB, userDB }, t) {
        throw new Error(`Command ${this.name} doesn't has a run method`);
    }

    /* Simple utils */
    async fetchJson(url, options = {}) {
        const res = await require("node-fetch")(url, options);
        return res.json();
    }

    async getUserFromIdOrMention(idOrMention) {
        let user;
        if (idOrMention) {
            if (idOrMention.startsWith("<@")) {
                user = userFromMention(idOrMention, this.client) ?? null;
            }
            if (!isNaN(parseInt(idOrMention))) {
                user = (await this.client.users.fetch(idOrMention)) ?? null;
            }
        }
        return user;
    }

    getStatusEmoji(status) {
        const emojis = this.client.customEmojis;
        switch (status) {
            case "online":
                return emojis.online;
            case "dnd":
                return emojis.dnd;
            case "idle":
                return emojis.idle;
            case "offline":
            default:
                return emojis.offline;
                break;
        }
    }

    getUsage(t) {
        const usage = t(`cmds:${this.name}.usage`);
        if (usage === `${this.name}.usage`) return this.defaultUsage;
        return usage;
    }

    getPermTranslation(perm, t) {
        return t(
            `permissions:${new Permissions(perm)
                .toArray()
                .join("")
                .toUpperCase()}`
        );
    }
};
