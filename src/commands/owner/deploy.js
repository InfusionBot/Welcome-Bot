/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "deploy",
                //aliases: ["addslash"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    ownerOnly: true,
                },
                disabled: false,
                cooldown: 20,
                category: "Owner Only",
            },
            client
        );
    }

    execute({ message, args }) {
        let commands = this.client.commands.enabled
            .filter((cmd) => cmd.slash)
            .map(({ name, options }) => {
                const cmd = { name };
                if (options && options?.length) cmd.options = options;
                return cmd;
            });
        commands = [...commands.values()];
        let cmds;
        this.client.guilds.cache.forEach(async (guild) => {
            let guildDB;
            try {
                guildDB = await this.client.models.Guild.findOne({
                    guildId: guild.id,
                });
            } catch (e) {
                guildDB = null;
            }
            const guildT = this.client.i18next.getFixedT(
                guildDB.lang || "en-US"
            );
            const cmdsWithDesc = commands.map((cmd) => {
                cmd.description = guildT(`cmds:${cmd.name}.cmdDesc`);
                return cmd;
            });
            if (guild.id === this.client.config.botGuildId) {
                cmds = cmdsWithDesc;
                await guild.commands.set(cmdsWithDesc);
                return;
            }
            await guild.commands.set(cmdsWithDesc).catch(() => {});
        });
        message.reply(
            `Successfully reloaded slash commands!\n${
                args[0] && args[0].toLowerCase() === "--show-cmds"
                    ? `• ${cmds.map((cmd) => cmd.name).join("\n• ")}`
                    : ""
            }`
        );
    }
};
