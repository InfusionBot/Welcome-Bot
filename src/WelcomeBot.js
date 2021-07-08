/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const fs = require("fs");
const { Client, Collection, Intents, Permissions } = require("discord.js");
const Command = require("./classes/Command");
const util = require("util");
const packageJson = require("../package.json");
const Logger = require("colors-logger");
const { Player } = require("discord-player");

class WelcomeBot extends Client {
    constructor(opts) {
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
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_PRESENCES,
            ],
            partials: ["CHANNEL"],
            messageCacheMaxSize: 100,
        });
        this.commands = {
            enabled: new Collection(),
            disabled: new Collection(),
            cooldowns: new Collection(),
        };
        this.logger = new Logger();
        this.defaultPrefix = process.env.BOT_PREFIX;
        this.guildSchema = require("./schema/guildSchema");
        this.versionSchema = require("./schema/versionSchema");
        this.categories = require("./data/categories.json");
        this.allPerms = [
            { perm: Permissions.FLAGS.ADMINISTRATOR, val: "ADMINISTRATOR" },
            {
                perm: Permissions.FLAGS.CREATE_INSTANT_INVITE,
                val: "CREATE_INSTANT_INVITE",
            },
            { perm: Permissions.FLAGS.KICK_MEMBERS, val: "KICK_MEMBERS" },
            { perm: Permissions.FLAGS.BAN_MEMBERS, val: "BAN_MEMBERS" },
            { perm: Permissions.FLAGS.MANAGE_CHANNELS, val: "MANAGE_CHANNELS" },
            { perm: Permissions.FLAGS.MANAGE_GUILD, val: "MANAGE_GUILD" },
            { perm: Permissions.FLAGS.ADD_REACTIONS, val: "ADD_REACTIONS" },
            { perm: Permissions.FLAGS.VIEW_AUDIT_LOG, val: "VIEW_AUDIT_LOG" },
            {
                perm: Permissions.FLAGS.PRIORITY_SPEAKER,
                val: "PRIORITY_SPEAKER",
            },
            { perm: Permissions.FLAGS.STREAM, val: "STREAM" },
            { perm: Permissions.FLAGS.VIEW_CHANNEL, val: "VIEW_CHANNEL" },
            { perm: Permissions.FLAGS.SEND_MESSAGES, val: "SEND_MESSAGES" },
            {
                perm: Permissions.FLAGS.SEND_TTS_MESSAGES,
                val: "SEND_TTS_MESSAGES",
            },
            { perm: Permissions.FLAGS.MANAGE_MESSAGES, val: "MANAGE_MESSAGES" },
            { perm: Permissions.FLAGS.EMBED_LINKS, val: "EMBED_LINKS" },
            { perm: Permissions.FLAGS.ATTACH_FILES, val: "ATTACH_FILES" },
            {
                perm: Permissions.FLAGS.READ_MESSAGE_HISTORY,
                val: "READ_MESSAGE_HISTORY",
            },
            {
                perm: Permissions.FLAGS.MENTION_EVERYONE,
                val: "MENTION_EVERYONE",
            },
            {
                perm: Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
                val: "USE_EXTERNAL_EMOJIS",
            },
            {
                perm: Permissions.FLAGS.VIEW_GUILD_INSIGHTS,
                val: "VIEW_GUILD_INSIGHTS",
            },
            { perm: Permissions.FLAGS.CONNECT, val: "CHANGE_NICKNAME" },
            { perm: Permissions.FLAGS.SPEAK, val: "SPEAK" },
            { perm: Permissions.FLAGS.MUTE_MEMBERS, val: "MUTE_MEMBERS" },
            { perm: Permissions.FLAGS.DEAFEN_MEMBERS, val: "DEAFEN_MEMBERS" },
            { perm: Permissions.FLAGS.MOVE_MEMBERS, val: "MOVE_MEMBERS" },
            { perm: Permissions.FLAGS.USE_VAD, val: "USE_VAD" },
            { perm: Permissions.FLAGS.CHANGE_NICKNAME, val: "CHANGE_NICKNAME" },
            {
                perm: Permissions.FLAGS.MANAGE_NICKNAMES,
                val: "MANAGE_NICKNAMES",
            },
            { perm: Permissions.FLAGS.MANAGE_ROLES, val: "MANAGE_ROLES" },
            { perm: Permissions.FLAGS.MANAGE_WEBHOOKS, val: "MANAGE_WEBHOOKS" },
            { perm: Permissions.FLAGS.MANAGE_EMOJIS, val: "MANAGE_EMOJIS" },
            {
                perm: Permissions.FLAGS.USE_APPLICATION_COMMANDS,
                val: "USE_APPLICATION_COMMANDS",
            },
            {
                perm: Permissions.FLAGS.REQUEST_TO_SPEAK,
                val: "REQUEST_TO_SPEAK",
            },
        ];
        this.site = "https://welcome-bot.github.io/";
        this.wait = util.promisify(setTimeout); // client.wait(1000) - Wait 1 second
        this.botVersion = packageJson.version;
        this.changelog = packageJson.changelog;
        this.botServerId = "836854115526770708";
        this.newsChannelId = "847459283876577360";
        this.loggingChannelId = "855331801635749888";
        this.suggestionLogsChannelId = "862126837110800414";
        this.ownerIDs = [
            "815204465937481749" /*PuneetGopinath#0001*/,
            "693754859014324295" /*abhijoshi2k#6842*/,
        ];
        this.debug = opts.debug || process.env.NODE_ENV === "development";
        this.ownersTags = ["PuneetGopinath#0001", "abhijoshi2k#6842"];
        this.player = new Player(this, {
            leaveOnEmpty: false,
            enableLive: true,
        });
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
            metadata: {cooldown: 3,},
            ownerOnly: false,
            category: "General",
        };
        let command = require(`${commandPath}/${commandName.replace(
            ".js",
            ""
        )}`);
        command = new Command(this, command);
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
            this.commands.enabled.set(command.name, command);
        } else {
            this.commands.disabled.set(command.name, command);
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
