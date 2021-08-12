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
                aliases: ["addslash"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    ownerOnly: true,
                },
                disabled: false,
                cooldown: 10,
                category: "Owner Only",
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    async execute({ message, args, guildDB, userDB }, t) {
        const errors = [];
        let commands = this.client.commands.enabled
            .filter((cmd) => Object.hasOwnProperty.call(cmd, "run"))
            .map(({ name, options }) => {
                const cmd = { name };
                if (options && options?.length) cmd.options = options;
                return cmd;
            });
        commands = [...commands.values()];
        console.log(commands);
        this.client.guilds.cache.forEach(async (guild) => {
            const guildT = this.client.i18next.getFixedT(
                guildDB.lang || "en-US"
            );
            const cmdsWithDesc = commands.map((cmd) => {
                cmd.description = guildT(`cmds:${cmd.name}.cmdDesc`);
                return cmd;
            });
            console.log(cmdsWithDesc);
            await guild.commands
                .set(cmdsWithDesc)
                .catch((e) => errors.push(e?.path));
        });
        message.reply(
            `Successfully reloaded slash commands!\nErrors:\n${errors.join(
                ", "
            )}`
        );
    }
};
