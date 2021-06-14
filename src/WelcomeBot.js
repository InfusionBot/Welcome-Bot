/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const fs = require("fs");
const { Client, Collection } = require("discord.js");
const util = require("util");
const packageJson = require("../package.json");

class WelcomeBot extends Client {
    constructor() {
        super({
            allowedMentions: {
                parse: ["users"],
            },
        });
        this.commands = new Collection();
        this.disabled = new Collection();
        this.cooldowns = new Collection();
        this.defaultPrefix = "w/";
        this.categories = [
            { name: "Setup", emoji: "" },
            { name: "General", emoji: "" },
            { name: "Information", emoji: "" },
            { name: "Moderation", emoji: "" },
            { name: "Miscellaneous", emoji: "" },
            { name: "Fun", emoji: "<:fun:854002049095303188>" },
            { name: "Owner Only", emoji: "" },
        ];
        this.wait = util.promisify(setTimeout); // client.wait(1000) - Wait 1 second
        this.botVersion = packageJson.version;
        this.changelog = packageJson.changelog;

        const commandFolder = __dirname + "/commands";
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

    loadCommand(commandPath, commandName) {
        let defaultOpts = {
            bot_perms: [
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "READ_MESSAGE_HISTORY",
                "MANAGE_MESSAGES",
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
}

module.exports = WelcomeBot;
