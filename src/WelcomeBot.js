/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const fs = require("fs");
const { Client, Collection, Intents, Permissions } = require("discord.js");
const util = require("util");
const packageJson = require("../package.json");

class WelcomeBot extends Client {
    constructor() {
        //https://discord.js.org/#/docs/main/master/class/Intents?scrollTo=s-FLAGS
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_WEBHOOKS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
            ],
            messageCacheMaxSize: 100,
        });
        this.commands = new Collection();
        this.disabled = new Collection();
        this.cooldowns = new Collection();
        this.defaultPrefix = "w/";
        this.guildSchema = require("./schema/guildSchema");
        this.versionSchema = require("./schema/versionSchema");
        this.categories = [
            { name: "Setup", emoji: "" },
            { name: "General", emoji: "" },
            { name: "Information", emoji: "" },
            { name: "Manage", emoji: "" },
            { name: "Moderation", emoji: "" },
            { name: "Miscellaneous", emoji: "" },
            { name: "Fun", emoji: "<:fun:854002049095303188>" },
            { name: "Owner Only", emoji: "" },
        ];
        this.allPerms = [
            { perm: "ADMINISTRATOR", val: "Administrator" },
            { perm: "CREATE_INSTANT_INVITE", val: "Create Instant Invite" },
            { perm: "KICK_MEMBERS", val: "Kick Members" },
            { perm: "BAN_MEMBERS", val: "Ban Members" },
            { perm: "MANAGE_CHANNELS", val: "Manage Channels" },
            { perm: "MANAGE_GUILD", val: "Manage Server" },
            { perm: "ADD_REACTIONS", val: "Add Reactions" },
            { perm: "VIEW_AUDIT_LOG", val: "View Audit Log" },
            { perm: "PRIORITY_SPEAKER", val: "Priority Speaker" },
            { perm: "STREAM", val: "Stream" },
            { perm: "VIEW_CHANNEL", val: "View Channels" },
            { perm: "SEND_MESSAGES", val: "Send Messages" },
            { perm: "SEND_TTS_MESSAGES", val: "Send TTS Messages" },
            { perm: "MANAGE_MESSAGES", val: "Manage Messages" },
            { perm: "EMBED_LINKS", val: "Embed Links" },
            { perm: "ATTACH_FILES", val: "Attach Files" },
            { perm: "READ_MESSAGE_HISTORY", val: "Read Message History" },
            { perm: "MENTION_EVERYONE", val: "Mention Everyone" },
            { perm: "USE_EXTERNAL_EMOJIS", val: "Use External Emojis" },
            { perm: "VIEW_GUILD_INSIGHTS", val: "View Server Insights" },
            { perm: "CONNECT", val: "Connect" },
            { perm: "SPEAK", val: "Speak" },
            { perm: "MUTE_MEMBERS", val: "Mute Members" },
            { perm: "DEAFEN_MEMBERS", val: "Deafen Members" },
            { perm: "MOVE_MEMBERS", val: "Move Members" },
            { perm: "USE_VAD", val: "Use Voice Activity" },
            { perm: "CHANGE_NICKNAME", val: "Change Nickname" },
            { perm: "MANAGE_NICKNAMES", val: "Manage Nicknames" },
            { perm: "MANAGE_ROLES", val: "Manage Roles" },
            { perm: "MANAGE_WEBHOOKS", val: "Manage Webhooks" },
            { perm: "MANAGE_EMOJIS", val: "Manage Emojis" },
        ];
        this.wait = util.promisify(setTimeout); // client.wait(1000) - Wait 1 second
        this.botVersion = packageJson.version;
        this.changelog = packageJson.changelog;
        this.botServerId = "836854115526770708";
        this.newsChannelId = "847459283876577360";

        const commandFolder = __dirname + "/commands";
        this.loadCommands(commandFolder);
    }

    loadCommand(commandPath, commandName) {
        let defaultOpts = {
            bot_perms: [
                Permissions.FLAGS.VIEW_CHANNEL,
                Permissions.FLAGS.SEND_MESSAGES,
                Permissions.FLAGS.READ_MESSAGE_HISTORY,
            ],
            args: false,
            catchError: true,
            disabled: false,
            cooldown: 3,
            ownerOnly: false,
            category: "General",
        };
        let command = require(`${commandPath}/${commandName.replace(
            ".js",
            ""
        )}`);
        if (command.bot_perms) {
            command.rawBotPerms = command.bot_perms;
            let index;
            for (var i = 0; i < this.allPerms.length; i++) {
                index = command.bot_perms.indexOf(this.allPerms[i].perm);
                if (index !== -1) {
                    command.bot_perms[index] =
                        Permissions.FLAGS[this.allPerms[i].perm];
                }
            }
            command.bot_perms = [
                ...defaultOpts.bot_perms,
                ...command.bot_perms,
            ];
        }
        if (command.permissions) {
            command.rawPerms = command.permissions;
            let index;
            for (var i = 0; i < this.allPerms.length; i++) {
                index = command.permissions.indexOf(this.allPerms[i].perm);
                if (index !== -1) {
                    command.permissions[index] =
                        Permissions.FLAGS[this.allPerms[i].perm];
                }
            }
        }
        command = {
            ...defaultOpts,
            ...command,
        };
        if (!command.disabled) {
            this.commands.set(command.name, command);
        } else {
            this.disabled.set(command.name, command);
        }
        return command;
    }

    loadCommands(commandFolder) {
        const commandFolders = fs.readdirSync(commandFolder);

        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`${commandFolder}/${folder}`)
                .filter((file) => file.endsWith(".js"));
            for (const file of commandFiles) {
                this.loadCommand(`${commandFolder}/${folder}`, file);
            }
        }
    }
}

module.exports = WelcomeBot;
