/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const fs = require("fs");
const { Client, Collection, Intents, Options } = require("discord.js");
const config = require("./config");
const util = require("util");
const packageJson = require(__dirname + "/../package.json");
const Logger = require("colors-logger");
const { Player } = require("discord-player");
const dbAuditor = require("./db/functions/dbAuditor");

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
                //Intents.FLAGS.GUILD_PRESENCES,
            ],
            makeCache: Options.cacheWithLimits({
                MessageManager: 200,
            }),
            partials: ["CHANNEL"],
            //messageCacheMaxSize: 100,
            //messageCacheLifetime: 60 * 24 * 7, //Message older than 7 days are considered removable
            //messageSweepInterval: 60 * 24 * 14, //Every 14 days, remove messages from the cache that are older than the message cache lifetime
        });
        this.username = "Welcome-Bot";
        this.commands = {
            enabled: new Collection(),
            disabled: new Collection(),
            cooldowns: new Collection(),
        };
        this.logger = new Logger();
        this.guildSchema = require("./schema/guildSchema");
        //this.versionSchema = require("./schema/versionSchema");
        this.userSchema = require("./schema/userSchema");
        this.dashboard = require("./dashboard/app");
        this.dashboard.states = {};
        this.categories = [];
        this.customEmojis = require("./data/customEmojis.json");
        this.languages = require("./locales/languages.json");
        this.allPerms = require("./data/allPerms");
        this.wait = util.promisify(setTimeout); // client.wait(1000) - Wait 1 second
        this.package = packageJson;
        this.config = config;
        this.botGuildId = config.botGuildId;
        this.ownerIDs = config.ownerIDs;
        this.debug = opts?.debug || process.env.NODE_ENV === "development";
        this.debugLevel = opts?.debugLevel || process.env?.DEBUG_LEVEL || 0;
        const ownersTags = [];
        (async (client) => {
            for (let i = 0; i < client.config.ownerIds.length; i++) {
                const user = await client.users.fetch(
                    client.config.ownerIds[i]
                );
                ownersTags.push(`${user?.tag}`);
            }
        })(this);
        this.ownersTags = ownersTags;
        const staffTags = [];
        (async (client) => {
            for (let i = 0; i < client.config.staffIds.length; i++) {
                const user = await client.users.fetch(
                    client.config.staffIds[i]
                );
                staffTags.push(`${user?.tag}`);
            }
        })(this);
        this.staffTags = staffTags;
        this.player = new Player(this, {
            leaveOnEmpty: false,
            leaveOnStop: true,
            enableLive: true,
        });
        this.addDbFuncs();
    }

    async onReady() {
        const presence = require("./functions/presence");
        const serverCount = require("./functions/serverCount");
        await require("./loaders/Locale.js")(this);
        if (this.config.dashboard.enabled) this.dashboard.load(this);
        else this.logger.log("Dashboard not enabled", "debug");
        this.loadCommands(__dirname + "/commands");
        presence(this);
        if (process.env.NODE_ENV === "production") serverCount(this);
        // 1 * 60 * (1 second)
        // Update presence every 1 minute
        setInterval(() => presence(this), 1 * 60 * 1000);
        // Update server count every 25 minutes if environment is in PRODUCTION
        if (process.env.NODE_ENV === "production")
            setInterval(() => serverCount(this), 25 * 60 * 1000);
        dbAuditor(this);
        //Run dbAuditor every 3 hours
        setInterval(() => {
            dbAuditor(this);
        }, 3 * 60 * 60 * 1000);
        require("./functions/versionSender")(this);
        if (process.env.NODE_ENV !== "production")
            require("./helpers/updateDocs")(this);
        this.logger.log(`Welcome-Bot v${this.package.version} started!`);
    }

    /*loadCommand(commandPath, commandName) {
        const CMD = require(`${commandPath}/${commandName.replace(".js", "")}`);
        return this.setCmd(CMD);
    }*/

    setCmd(CMD) {
        const command = new CMD(this);
        if (!command.disabled) {
            this.commands.enabled.set(command.name, command);
        } else {
            this.commands.disabled.set(command.name, command);
        }
        return command;
    }

    loadCommands(commandFolder) {
        if (this.debug && this.debugLevel > 1)
            this.logger.log("Loading commands", "debug", ["CORE", "CMDS"]);
        const commandFolders = fs.readdirSync(commandFolder);

        for (const folder of commandFolders) {
            /*const commandFiles = fs
                .readdirSync(`${commandFolder}/${folder}`)
                .filter((file) => file.endsWith(".js"));
            for (const file of commandFiles) {
                try {
                    this.loadCommand(`${commandFolder}/${folder}`, file);
                } catch (e) {
                    this.logger.log(`Error occurred when loading ${file}`);
                    console.error(e);
                    process.exit();
                }
            }*/
            const {
                commands,
                metadata,
            } = require(`${commandFolder}/${folder}`);
            for (const cmd of commands) {
                try {
                    this.setCmd(cmd);
                } catch (e) {
                    this.logger.log(`Error occurred when loading ${cmd.name}`);
                    console.error(e);
                }
            }
            if (metadata.name.indexOf("Owner") === -1)
                this.categories.push(metadata);
        }
        if (this.debug && this.debugLevel > 1)
            this.logger.log("Finished loading commands", "debug", [
                "CORE",
                "CMDS",
            ]);
    }

    setDebug(debug = true, level = 0) {
        this.debug = debug;
        this.debugLevel = level;
        return true;
    }

    findCMD(cmdName) {
        let cmd;
        let disabledCmd;
        try {
            cmd = this.commands.enabled.find(cmdName);
            disabledCmd = this.commands.disabled.find(cmdName);
        } catch (e) {
            if (!cmd && !disabledCmd) {
                throw new Error(
                    `Tried to find ${cmdName}, but it wasn't there in the commands.`
                );
                // eslint-disable-next-line no-unreachable
                return;
            }
        }
        return cmd.name ? cmd : disabledCmd;
    }

    addDbFuncs() {
        const dbFolder = __dirname + "/db/functions";
        const dbFuncs = fs.readdirSync(dbFolder);

        for (const folder of dbFuncs) {
            if (!folder.endsWith(".js")) {
                const dbFiles = fs
                    .readdirSync(`${dbFolder}/${folder}`)
                    .filter((file) => file.endsWith(".js"));
                this[`${folder}DbFuncs`] = {};
                for (const file of dbFiles) {
                    try {
                        const f = file.replace(".js", "");
                        this[`${folder}DbFuncs`][
                            f
                        ] = require(`${dbFolder}/${folder}/${f}`);
                    } catch (e) {
                        this.logger.log(`Error occurred when loading ${file}`);
                        console.error(e);
                        process.exit();
                    }
                }
            }
        }
    }
}

module.exports = WelcomeBot;
