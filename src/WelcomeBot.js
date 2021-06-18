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
            messageCacheMaxSize: 100,
        });
        this.commands = new Collection();
        this.logger = new Logger();
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
            { name: "Core", emoji: "" },
        ];
        this.allPerms = require("./permissions.json");
        this.site = "https://welcome-bot.github.io/";
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
        let validated = true;
        if (command.name !== command.name.toLowerCase()) {
            throw new TypeError("Command names must be lower case only");
            validated = false;
        }
        if (command.subcommands && !command.subs_desc) {
            throw new TypeError(
                "If subcommands are provided then their description should also be provided"
            );
            validated = false;
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
