/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const fs = require("fs");
const { Client, Collection, Intents, Permissions } = require("discord.js");
const util = require("util");
const packageJson = require("../package.json");
const Logger = require("colors-logger");

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
            partials: ["CHANNEL"],
            messageCacheMaxSize: 100,
        });
        this.commands = new Collection();
        this.logger = new Logger();
        this.disabled = new Collection();
        this.cooldowns = new Collection();
        this.defaultPrefix = process.env.PREFIX;
        this.guildSchema = require("./schema/guildSchema");
        this.versionSchema = require("./schema/versionSchema");
        this.categories = [
            {
                name: "Setup",
                key: "setup",
                emoji: "<:setup:854316242097537034>",
            },
            {
                name: "General",
                key: "general",
                emoji: "<:pikachu2:852569608259239936>",
            },
            { name: "Information", key: "info", emoji: "ℹ️" },
            { name: "Moderation", key: "mod", emoji: "" },
            { name: "Miscellaneous", key: "misc", emoji: "" },
            { name: "Fun", key: "fun", emoji: "<:fun:854002049095303188>" },
            { name: "Anime", key: "anime", emoji: "📷" },
            {
                name: "Games",
                key: "games",
                emoji: "<:games:856910189490864140>",
            },
            {
                name: "Owner Only",
                key: "owner",
                emoji: "<:owner:854009566572183572>",
            },
            { name: "Core", key: "core", emoji: "" },
        ];
        this.allPerms = [
            { perm: Permissions.FLAGS.ADMINISTRATOR, val: "Administrator" },
            {
                perm: Permissions.FLAGS.CREATE_INSTANT_INVITE,
                val: "Create Instant Invite",
            },
            { perm: Permissions.FLAGS.KICK_MEMBERS, val: "Kick Members" },
            { perm: Permissions.FLAGS.BAN_MEMBERS, val: "Ban Members" },
            { perm: Permissions.FLAGS.MANAGE_CHANNELS, val: "Manage Channels" },
            { perm: Permissions.FLAGS.MANAGE_GUILD, val: "Manage Server" },
            { perm: Permissions.FLAGS.ADD_REACTIONS, val: "Add Reactions" },
            { perm: Permissions.FLAGS.VIEW_AUDIT_LOG, val: "View Audit Log" },
            {
                perm: Permissions.FLAGS.PRIORITY_SPEAKER,
                val: "Priority Speaker",
            },
            { perm: Permissions.FLAGS.STREAM, val: "Stream" },
            { perm: Permissions.FLAGS.VIEW_CHANNEL, val: "View Channels" },
            { perm: Permissions.FLAGS.SEND_MESSAGES, val: "Send Messages" },
            {
                perm: Permissions.FLAGS.SEND_TTS_MESSAGES,
                val: "Send TTS Messages",
            },
            { perm: Permissions.FLAGS.MANAGE_MESSAGES, val: "Manage Messages" },
            { perm: Permissions.FLAGS.EMBED_LINKS, val: "Embed Links" },
            { perm: Permissions.FLAGS.ATTACH_FILES, val: "Attach Files" },
            {
                perm: Permissions.FLAGS.READ_MESSAGE_HISTORY,
                val: "Read Message History",
            },
            {
                perm: Permissions.FLAGS.MENTION_EVERYONE,
                val: "Mention Everyone",
            },
            {
                perm: Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
                val: "Use External Emojis",
            },
            {
                perm: Permissions.FLAGS.VIEW_GUILD_INSIGHTS,
                val: "View Server Insights",
            },
            { perm: Permissions.FLAGS.CONNECT, val: "Connect" },
            { perm: Permissions.FLAGS.SPEAK, val: "Speak" },
            { perm: Permissions.FLAGS.MUTE_MEMBERS, val: "Mute Members" },
            { perm: Permissions.FLAGS.DEAFEN_MEMBERS, val: "Deafen Members" },
            { perm: Permissions.FLAGS.MOVE_MEMBERS, val: "Move Members" },
            { perm: Permissions.FLAGS.USE_VAD, val: "Use Voice Activity" },
            { perm: Permissions.FLAGS.CHANGE_NICKNAME, val: "Change Nickname" },
            {
                perm: Permissions.FLAGS.MANAGE_NICKNAMES,
                val: "Manage Nicknames",
            },
            { perm: Permissions.FLAGS.MANAGE_ROLES, val: "Manage Roles" },
            { perm: Permissions.FLAGS.MANAGE_WEBHOOKS, val: "Manage Webhooks" },
            { perm: Permissions.FLAGS.MANAGE_EMOJIS, val: "Manage Emojis" },
            {
                perm: Permissions.FLAGS.USE_APPLICATION_COMMANDS,
                val: "Use Slash commands",
            },
            {
                perm: Permissions.FLAGS.REQUEST_TO_SPEAK,
                val: "Request to Speak",
            },
        ];
        this.site = "https://welcome-bot.github.io/";
        this.wait = util.promisify(setTimeout); // client.wait(1000) - Wait 1 second
        this.botVersion = packageJson.version;
        this.changelog = packageJson.changelog;
        this.botServerId = "836854115526770708";
        this.newsChannelId = "847459283876577360";
        this.loggingChannelId = "855331801635749888";
        this.ownerIDs = [
            "815204465937481749" /*PuneetGopinath#6300*/,
            "693754859014324295" /*abhijoshi2k#6842*/,
        ];
        this.ownersTags = ["PuneetGopinath#0001", "abhijoshi2k#6842"];

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
        let validated = true;
        if (command.name !== command.name.toLowerCase()) {
            throw new TypeError("Command names must be lower case only");
            validated = false;
        }
        if (command.subcommands) {
            for (var i = 0; i < command.subcommands.length; i++) {
                if (
                    command.subcommands[i].name &&
                    !command.subcommands[i].desc
                ) {
                    throw new TypeError(
                        "If subcommands are provided then their description should also be provided\nDescription not provided for " +
                            command.subcommands[i].name
                    );
                    validated = false;
                }
            }
        }
        if (!validated) {
            process.exit();
        }
        if (command.bot_perms) {
            command.bot_perms = [
                ...defaultOpts.bot_perms,
                ...command.bot_perms,
            ];
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
